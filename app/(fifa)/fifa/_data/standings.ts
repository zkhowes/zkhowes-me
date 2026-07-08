// Server-side standings computation shared by the page and the API route.
import {
  PLAYERS,
  playerForTeam,
  scoreMatch,
  canonicalTeam,
  type Player,
} from "./tournament";

export type TeamLine = {
  name: string;
  matches: number;
  points: number;
  alive: boolean; // still in the tournament
  possible: number; // max points still attainable (10 per remaining round)
};

export type Standing = {
  id: string;
  name: string;
  photo: string;
  points: number;
  possible: number; // sum of teams' still-attainable points (0 if all eliminated)
  teams: TeamLine[];
};

/** One team's involvement in a match: who owns it and what they earned. */
export type MatchSide = {
  team: string; // canonical team name
  goals: number;
  points: number; // points earned by the owning player (0 if undrafted)
  ownerId: string | null;
  ownerName: string | null;
  ownerPhoto: string | null;
};

/** A single fixture from the latest match day. */
export type DayMatch = {
  date: string; // ISO date (yyyy-mm-dd)
  stage: string;
  home: MatchSide;
  away: MatchSide;
};

/** A knockout fixture positioned in the bracket. Sides are null until the
 *  tournament fills them in (SF/Final start empty → rendered as placeholders). */
export type BracketMatch = {
  slot: string; // "M97".."M104" — bracket position label
  stage: string;
  date: string | null; // ISO date (yyyy-mm-dd), null if unscheduled
  time: string | null; // "HH:mm" UTC, null if unscheduled
  status: string; // FINISHED | TIMED | SCHEDULED | ...
  home: MatchSide | null;
  away: MatchSide | null;
  homeWon: boolean;
  awayWon: boolean;
  played: boolean;
};

/** The knockout tree, grouped for a left/center/right bracket render. */
export type Bracket = {
  leftQF: BracketMatch[]; // top-left, bottom-left quarter-finals
  rightQF: BracketMatch[]; // top-right, bottom-right quarter-finals
  semis: BracketMatch[]; // [left SF, right SF]
  final: BracketMatch | null;
  thirdPlace: BracketMatch | null;
};

export type StandingsResult = {
  standings: Standing[];
  lastUpdated: string;
  source: "live" | "baseline";
  finishedMatches: number;
  unresolvedTeams: string[];
  latestDay: string | null; // yyyy-mm-dd of the most recent finished day
  latestMatches: DayMatch[]; // fixtures from that day, with player impact
  bracket: Bracket | null; // knockout tree (null on baseline / no KO data)
  tournamentComplete: boolean; // true once the FINAL has been played
};

type FDMatch = {
  id: number;
  status: string;
  utcDate: string;
  stage: string;
  homeTeam: { name: string; shortName?: string; tla?: string };
  awayTeam: { name: string; shortName?: string; tla?: string };
  score: { fullTime: { home: number | null; away: number | null } };
};

const PLAYER_BY_ID = new Map(PLAYERS.map((p) => [p.id, p]));

/** Build a MatchSide: resolve owner + compute points for a team's result. */
function buildSide(rawTeam: string, gf: number, ga: number): MatchSide {
  const canon = canonicalTeam(rawTeam);
  const ownerId = playerForTeam(rawTeam);
  const owner = ownerId ? PLAYER_BY_ID.get(ownerId) : undefined;
  return {
    team: canon,
    goals: gf,
    points: owner ? scoreMatch(gf, ga) : 0,
    ownerId: ownerId ?? null,
    ownerName: owner?.name ?? null,
    ownerPhoto: owner?.photo ?? null,
  };
}

// Rounds remaining (incl. the one about to be played) → how many more matches
// a team can play from a given stage. Multiply by MAX_PER_MATCH for max points.
const MAX_PER_MATCH = 10;
const STAGE_ORDER: Record<string, number> = {
  GROUP_STAGE: 0,
  LAST_32: 1,
  LAST_16: 2,
  QUARTER_FINALS: 3,
  SEMI_FINALS: 4,
  THIRD_PLACE: 4,
  FINAL: 5,
};
// Rounds left to win the title if you are ABOUT TO PLAY this stage.
const ROUNDS_FROM_STAGE: Record<string, number> = {
  LAST_32: 5,
  LAST_16: 4,
  QUARTER_FINALS: 3,
  SEMI_FINALS: 2,
  FINAL: 1,
};
const STAGE_BY_ORDER: Record<number, string> = {
  1: "LAST_32",
  2: "LAST_16",
  3: "QUARTER_FINALS",
  4: "SEMI_FINALS",
  5: "FINAL",
};

type TeamProgress = {
  lastFinishedStage: string | null;
  lastResult: "W" | "L" | "T" | null;
  upcomingOrder: number | null; // earliest scheduled round this team is named in
};

/**
 * Build per-team tournament progress from all matches, then derive how many
 * rounds each team can still play. A team is ALIVE if it has an upcoming named
 * match, OR its most recent knockout match was a win (advanced but not yet
 * slotted into the next fixture — the API leaves those opponents null).
 */
function buildProgress(matches: FDMatch[]): Map<string, TeamProgress> {
  const prog = new Map<string, TeamProgress>();
  const touch = (t: string) => {
    if (!prog.has(t))
      prog.set(t, { lastFinishedStage: null, lastResult: null, upcomingOrder: null });
    return prog.get(t)!;
  };

  for (const m of matches) {
    const hg = m.score?.fullTime?.home;
    const ag = m.score?.fullTime?.away;
    const sides: Array<{ raw?: string; gf: number | null; ga: number | null }> = [
      { raw: m.homeTeam?.name, gf: hg, ga: ag },
      { raw: m.awayTeam?.name, gf: ag, ga: hg },
    ];
    for (const s of sides) {
      if (!s.raw) continue;
      const t = canonicalTeam(s.raw);
      const p = touch(t);
      if (m.status === "FINISHED" && s.gf != null && s.ga != null) {
        const order = STAGE_ORDER[m.stage] ?? -1;
        const prevOrder = p.lastFinishedStage != null ? STAGE_ORDER[p.lastFinishedStage] : -1;
        if (order >= prevOrder) {
          p.lastFinishedStage = m.stage;
          p.lastResult = s.gf > s.ga ? "W" : s.gf === s.ga ? "T" : "L";
        }
      } else if (m.status !== "FINISHED") {
        const o = STAGE_ORDER[m.stage];
        if (o != null && (p.upcomingOrder == null || o < p.upcomingOrder)) p.upcomingOrder = o;
      }
    }
  }
  return prog;
}

/** Rounds a team can still play (0 if eliminated / not applicable). */
function roundsRemaining(prog: Map<string, TeamProgress>, team: string): number {
  const p = prog.get(team);
  if (!p) return 0;
  // Named in an upcoming match → remaining counts from that stage.
  if (p.upcomingOrder != null) {
    const stage = STAGE_BY_ORDER[p.upcomingOrder];
    return ROUNDS_FROM_STAGE[stage] ?? 0;
  }
  // Otherwise alive only if the last knockout match was a win (awaiting slotting).
  const lf = p.lastFinishedStage;
  if (!lf || lf === "GROUP_STAGE") return 0;
  if (p.lastResult !== "W") return 0;
  const nextStage = STAGE_BY_ORDER[(STAGE_ORDER[lf] ?? 0) + 1];
  return ROUNDS_FROM_STAGE[nextStage] ?? 0;
}

/** Build one bracket match from a raw fixture. A side with no named team
 *  (SF/Final before they're filled) becomes null → rendered as a placeholder. */
function buildBracketMatch(slot: string, m: FDMatch): BracketMatch {
  const hg = m.score?.fullTime?.home;
  const ag = m.score?.fullTime?.away;
  const played =
    m.status === "FINISHED" && hg != null && ag != null;
  const hasHome = !!m.homeTeam?.name;
  const hasAway = !!m.awayTeam?.name;
  return {
    slot,
    stage: m.stage,
    date: m.utcDate ? m.utcDate.slice(0, 10) : null,
    time: m.utcDate ? m.utcDate.slice(11, 16) : null,
    status: m.status,
    home: hasHome ? buildSide(m.homeTeam.name, hg ?? 0, ag ?? 0) : null,
    away: hasAway ? buildSide(m.awayTeam.name, ag ?? 0, hg ?? 0) : null,
    homeWon: played && (hg as number) > (ag as number),
    awayWon: played && (ag as number) > (hg as number),
    played,
  };
}

/** Assemble the knockout tree from all matches. Matches within a stage are
 *  ordered by kickoff then id so slot labels stay stable across syncs. */
function buildBracket(matches: FDMatch[]): Bracket | null {
  const byStage = (stage: string) =>
    matches
      .filter((m) => m.stage === stage)
      .sort((a, b) =>
        a.utcDate !== b.utcDate ? a.utcDate.localeCompare(b.utcDate) : a.id - b.id
      );

  const qf = byStage("QUARTER_FINALS");
  const sf = byStage("SEMI_FINALS");
  const tp = byStage("THIRD_PLACE");
  const fn = byStage("FINAL");

  if (qf.length === 0 && sf.length === 0 && fn.length === 0) return null;

  // Slot labels mirror the standard WC bracket (M97..M104).
  const qfMatches = qf.map((m, i) => buildBracketMatch(`M${97 + i}`, m));
  const sfMatches = sf.map((m, i) => buildBracketMatch(`M${101 + i}`, m));
  const thirdPlace = tp[0] ? buildBracketMatch("M103", tp[0]) : null;
  const final = fn[0] ? buildBracketMatch("M104", fn[0]) : null;

  return {
    // top-left & bottom-left feed the left semi; top-right & bottom-right the right.
    leftQF: [qfMatches[0], qfMatches[1]].filter(Boolean) as BracketMatch[],
    rightQF: [qfMatches[2], qfMatches[3]].filter(Boolean) as BracketMatch[],
    semis: sfMatches,
    final,
    thirdPlace,
  };
}

const FOOTBALL_DATA_URL =
  "https://api.football-data.org/v4/competitions/WC/matches";

/** Baseline standings from Tim's spreadsheet screenshot (fallback). */
function baselineStandings(nowISO: string): StandingsResult {
  const standings: Standing[] = PLAYERS.map((p: Player) => ({
    id: p.id,
    name: p.name,
    photo: p.photo,
    points: p.baseline,
    possible: 0, // unknown without live bracket data
    teams: p.teams.map((t) => ({ name: t, matches: 0, points: 0, alive: false, possible: 0 })),
  })).sort((a, b) => b.points - a.points);

  return {
    standings,
    lastUpdated: nowISO,
    source: "baseline",
    finishedMatches: 0,
    unresolvedTeams: [],
    latestDay: null,
    latestMatches: [],
    bracket: null,
    tournamentComplete: false,
  };
}

/**
 * Fetch finished WC 2026 matches and recompute every player's total from
 * scratch. Falls back to baseline if there's no token, the API errors, or no
 * finished matches are published yet under the `WC` competition.
 */
export async function computeStandings(nowISO: string): Promise<StandingsResult> {
  const token = process.env.FOOTBALL_DATA_TOKEN;
  if (!token) return baselineStandings(nowISO);

  let matches: FDMatch[];
  try {
    const res = await fetch(FOOTBALL_DATA_URL, {
      headers: { "X-Auth-Token": token },
      next: { revalidate: 3600 }, // hourly — stays well under 10 req/min
    });
    if (!res.ok) return baselineStandings(nowISO);
    const json = (await res.json()) as { matches?: FDMatch[] };
    matches = json.matches ?? [];
  } catch {
    return baselineStandings(nowISO);
  }

  const finished = matches.filter(
    (m) =>
      m.status === "FINISHED" &&
      m.score?.fullTime?.home != null &&
      m.score?.fullTime?.away != null
  );

  if (finished.length === 0) return baselineStandings(nowISO);

  // Per-team tournament progress (uses ALL matches, incl. upcoming fixtures).
  const progress = buildProgress(matches);

  // Accumulators keyed by player id → team name → line.
  const acc = new Map<string, Map<string, TeamLine>>();
  for (const p of PLAYERS) {
    const teamMap = new Map<string, TeamLine>();
    for (const t of p.teams) {
      const rounds = roundsRemaining(progress, t);
      teamMap.set(t, {
        name: t,
        matches: 0,
        points: 0,
        alive: rounds > 0,
        possible: rounds * MAX_PER_MATCH,
      });
    }
    acc.set(p.id, teamMap);
  }

  const unresolved = new Set<string>();

  const apply = (rawTeam: string, gf: number, ga: number) => {
    const pid = playerForTeam(rawTeam);
    if (!pid) {
      unresolved.add(rawTeam);
      return;
    }
    const canon = canonicalTeam(rawTeam);
    const line = acc.get(pid)?.get(canon);
    if (!line) return;
    line.matches += 1;
    line.points += scoreMatch(gf, ga);
  };

  for (const m of finished) {
    const h = m.score.fullTime.home as number;
    const a = m.score.fullTime.away as number;
    apply(m.homeTeam.name, h, a);
    apply(m.awayTeam.name, a, h);
  }

  const standings: Standing[] = PLAYERS.map((p) => {
    const teamMap = acc.get(p.id)!;
    const teams = p.teams.map((t) => teamMap.get(t)!);
    const points = teams.reduce((s, t) => s + t.points, 0);
    const possible = teams.reduce((s, t) => s + t.possible, 0);
    return { id: p.id, name: p.name, photo: p.photo, points, possible, teams };
  }).sort((a, b) => b.points - a.points);

  // Recent match days. Knockout days can be a single fixture, which looks thin
  // in the showcase slot — so accumulate the most recent days until we have at
  // least MIN_MATCHES (capped at MAX_DAYS) to keep the section substantial.
  const MIN_MATCHES = 4;
  const MAX_DAYS = 2;
  const distinctDays = [
    ...new Set(finished.map((m) => m.utcDate.slice(0, 10))),
  ].sort(); // ascending

  const chosenDays: string[] = [];
  let count = 0;
  for (let i = distinctDays.length - 1; i >= 0; i--) {
    if (chosenDays.length >= MAX_DAYS) break;
    if (chosenDays.length >= 1 && count >= MIN_MATCHES) break;
    const day = distinctDays[i];
    chosenDays.unshift(day);
    count += finished.filter((m) => m.utcDate.slice(0, 10) === day).length;
  }

  const latestDay = chosenDays.at(-1) ?? null;

  const latestMatches: DayMatch[] = finished
    .filter((m) => chosenDays.includes(m.utcDate.slice(0, 10)))
    .map((m) => {
      const h = m.score.fullTime.home as number;
      const a = m.score.fullTime.away as number;
      return {
        date: m.utcDate.slice(0, 10),
        stage: m.stage,
        home: buildSide(m.homeTeam.name, h, a),
        away: buildSide(m.awayTeam.name, a, h),
      };
    })
    // newest day first; within a day, matches touching a drafted team lead
    .sort((x, y) => {
      if (x.date !== y.date) return y.date.localeCompare(x.date);
      const xi = x.home.ownerId || x.away.ownerId ? 0 : 1;
      const yi = y.home.ownerId || y.away.ownerId ? 0 : 1;
      return xi - yi;
    });

  const tournamentComplete = matches.some(
    (m) => m.stage === "FINAL" && m.status === "FINISHED"
  );

  return {
    standings,
    lastUpdated: nowISO,
    source: "live",
    finishedMatches: finished.length,
    unresolvedTeams: [...unresolved],
    latestDay,
    latestMatches,
    bracket: buildBracket(matches),
    tournamentComplete,
  };
}
