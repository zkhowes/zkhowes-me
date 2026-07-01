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
};

export type Standing = {
  id: string;
  name: string;
  photo: string;
  points: number;
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

export type StandingsResult = {
  standings: Standing[];
  lastUpdated: string;
  source: "live" | "baseline";
  finishedMatches: number;
  unresolvedTeams: string[];
  latestDay: string | null; // yyyy-mm-dd of the most recent finished day
  latestMatches: DayMatch[]; // fixtures from that day, with player impact
};

type FDMatch = {
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

const FOOTBALL_DATA_URL =
  "https://api.football-data.org/v4/competitions/WC/matches";

/** Baseline standings from Tim's spreadsheet screenshot (fallback). */
function baselineStandings(nowISO: string): StandingsResult {
  const standings: Standing[] = PLAYERS.map((p: Player) => ({
    id: p.id,
    name: p.name,
    photo: p.photo,
    points: p.baseline,
    teams: p.teams.map((t) => ({ name: t, matches: 0, points: 0 })),
  })).sort((a, b) => b.points - a.points);

  return {
    standings,
    lastUpdated: nowISO,
    source: "baseline",
    finishedMatches: 0,
    unresolvedTeams: [],
    latestDay: null,
    latestMatches: [],
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

  // Accumulators keyed by player id → team name → line.
  const acc = new Map<string, Map<string, TeamLine>>();
  for (const p of PLAYERS) {
    const teamMap = new Map<string, TeamLine>();
    for (const t of p.teams) teamMap.set(t, { name: t, matches: 0, points: 0 });
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
    return { id: p.id, name: p.name, photo: p.photo, points, teams };
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

  return {
    standings,
    lastUpdated: nowISO,
    source: "live",
    finishedMatches: finished.length,
    unresolvedTeams: [...unresolved],
    latestDay,
    latestMatches,
  };
}
