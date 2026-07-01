// ─────────────────────────────────────────────────────────────────────────────
// KIEL SUX FIFA TOURNAMENT — single source of truth
// Players, their drafted teams, name aliases, and the scoring formula.
// Standings are RECOMPUTED live from finished World Cup 2026 matches (see the
// /api/fifa-scores route). The `baseline` scores below come from Tim's master
// spreadsheet screenshot and are used only as a fallback + validation reference.
// ─────────────────────────────────────────────────────────────────────────────

export type Player = {
  id: string;
  name: string;
  photo: string; // path under /public
  teams: [string, string, string]; // canonical team names (match API)
  baseline: number; // score from Tim's spreadsheet screenshot
};

export const PLAYERS: Player[] = [
  { id: "stale",   name: "Stale",   photo: "/fifa/players/stale.jpeg",   teams: ["Ecuador", "Norway", "Mexico"],                    baseline: 58 },
  { id: "tim",     name: "Tim",     photo: "/fifa/players/tim.jpeg",     teams: ["Brazil", "Bosnia and Herzegovina", "Austria"],    baseline: 53 },
  { id: "yap",     name: "Yap",     photo: "/fifa/players/yap.jpeg",     teams: ["Belgium", "South Africa", "Morocco"],             baseline: 51 },
  { id: "carlos",  name: "Carlos",  photo: "/fifa/players/carlos.jpeg",  teams: ["Netherlands", "Saudi Arabia", "Ivory Coast"],     baseline: 49 },
  { id: "raul",    name: "Raul",    photo: "/fifa/players/raul.jpeg",    teams: ["France", "Curacao", "Sweden"],                    baseline: 47 },
  { id: "rhett",   name: "Rhett",   photo: "/fifa/players/rhett.jpeg",   teams: ["Argentina", "New Zealand", "Australia"],          baseline: 46 },
  { id: "bhas",    name: "Bhas",    photo: "/fifa/players/bhas.jpeg",    teams: ["England", "Ghana", "Turkey"],                     baseline: 44 },
  { id: "filippo", name: "Filippo", photo: "/fifa/players/filippo.jpeg", teams: ["Japan", "Paraguay", "Senegal"],                   baseline: 44 },
  { id: "akos",    name: "Akos",    photo: "/fifa/players/akos.jpeg",    teams: ["Portugal", "Cape Verde", "Jordan"],               baseline: 42 },
  { id: "andreas", name: "Andreas", photo: "/fifa/players/andreas.jpeg", teams: ["Germany", "Iraq", "Switzerland"],                 baseline: 40 },
  { id: "zeek",    name: "Zeek",    photo: "/fifa/players/zeek.jpeg",    teams: ["South Korea", "Egypt", "Algeria"],                baseline: 39 },
  { id: "zach",    name: "Zach",    photo: "/fifa/players/zach.jpeg",    teams: ["Spain", "Haiti", "Canada"],                       baseline: 39 },
  { id: "miho",    name: "Miho",    photo: "/fifa/players/miho.jpeg",    teams: ["USA", "Czech Republic", "Iran"],                  baseline: 38 },
  { id: "michael", name: "Michael", photo: "/fifa/players/michael.jpeg", teams: ["Uruguay", "Scotland", "Colombia"],                baseline: 34 },
  { id: "rens",    name: "Rens",    photo: "/fifa/players/rens.jpeg",    teams: ["Croatia", "Qatar", "Panama"],                     baseline: 23 },
];

// The villain. Not a competitor — the mascot the whole tournament is named against.
export const KIEL_PHOTO = "/fifa/players/kiel.jpeg";

// Team-name aliases → canonical name. Left side is anything an API / spreadsheet
// might use (lowercased at match time); right side is the canonical PLAYERS name.
export const TEAM_ALIASES: Record<string, string> = {
  "dutch": "Netherlands",
  "holland": "Netherlands",
  "boznia": "Bosnia and Herzegovina",
  "bosnia": "Bosnia and Herzegovina",
  "bosnia & herzegovina": "Bosnia and Herzegovina",
  "bosnia and herzegovina": "Bosnia and Herzegovina",
  "bosnia-herzegovina": "Bosnia and Herzegovina", // football-data.org spelling
  "curacau": "Curacao",
  "curaçao": "Curacao", // football-data.org spelling (with cedilla)
  "uraguay": "Uruguay",
  "columbia": "Colombia",
  "swiss": "Switzerland",
  "austrailia": "Australia",
  "equador": "Ecuador",
  "s. africa": "South Africa",
  "s. korea": "South Korea",
  "korea republic": "South Korea",
  "republic of korea": "South Korea",
  "cabo verde": "Cape Verde",
  "cape verde islands": "Cape Verde", // football-data.org spelling
  "capo v": "Cape Verde",
  "capo v.": "Cape Verde",
  "cabo v.": "Cape Verde",
  "türkiye": "Turkey",
  "turkiye": "Turkey",
  "czechia": "Czech Republic", // football-data.org spelling
  "iran ": "Iran",
  "united states": "USA", // football-data.org spelling
  "usmnt": "USA",
  "ivory coast": "Ivory Coast",
  "côte d'ivoire": "Ivory Coast",
};

/** Normalize any team name to its canonical PLAYERS name (best effort). */
export function canonicalTeam(name: string): string {
  const trimmed = name.trim();
  const key = trimmed.toLowerCase();
  return TEAM_ALIASES[key] ?? trimmed;
}

/** canonical team name → owning player id. Built once. */
export const TEAM_TO_PLAYER: Record<string, string> = (() => {
  const map: Record<string, string> = {};
  for (const p of PLAYERS) {
    for (const t of p.teams) {
      map[t.toLowerCase()] = p.id;
    }
  }
  return map;
})();

/** Resolve a raw API/spreadsheet team name to the owning player id, or null. */
export function playerForTeam(rawName: string): string | null {
  const canon = canonicalTeam(rawName).toLowerCase();
  return TEAM_TO_PLAYER[canon] ?? null;
}

// ─────────────────────────────────────────────────────────────────────────────
// SCORING (from Tim's rules message)
//   Win = 6, Tie = 3, Loss = 0
//   +1 shutout (opponent scored 0)
//   +1 per goal scored, capped at 3
//   Hard max of 10 per match.
// Verified specials: 3-0→10, 6-0→10(cap), 2-1 win→8 / loser→1, 1-0→8, 2-2→5, 0-1→0.
// ─────────────────────────────────────────────────────────────────────────────
export function scoreMatch(goalsFor: number, goalsAgainst: number): number {
  const base = goalsFor > goalsAgainst ? 6 : goalsFor === goalsAgainst ? 3 : 0;
  const shutout = goalsAgainst === 0 ? 1 : 0;
  const goalPts = Math.min(goalsFor, 3);
  return Math.min(10, base + shutout + goalPts);
}

export const STAKES = {
  entryPerTeam: 20,
  worldCupWinnerBonus: 20,
  pointsLeaderPrize: 300,
};

/** Flag emoji lookup for a canonical team name (decorative). */
export const TEAM_FLAGS: Record<string, string> = {
  Ecuador: "🇪🇨", Norway: "🇳🇴", Mexico: "🇲🇽",
  Brazil: "🇧🇷", "Bosnia and Herzegovina": "🇧🇦", Austria: "🇦🇹",
  Belgium: "🇧🇪", "South Africa": "🇿🇦", Morocco: "🇲🇦",
  Netherlands: "🇳🇱", "Saudi Arabia": "🇸🇦", "Ivory Coast": "🇨🇮",
  France: "🇫🇷", Curacao: "🇨🇼", Sweden: "🇸🇪",
  Argentina: "🇦🇷", "New Zealand": "🇳🇿", Australia: "🇦🇺",
  England: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", Ghana: "🇬🇭", Turkey: "🇹🇷",
  Japan: "🇯🇵", Paraguay: "🇵🇾", Senegal: "🇸🇳",
  Portugal: "🇵🇹", "Cape Verde": "🇨🇻", Jordan: "🇯🇴",
  Germany: "🇩🇪", Iraq: "🇮🇶", Switzerland: "🇨🇭",
  "South Korea": "🇰🇷", Egypt: "🇪🇬", Algeria: "🇩🇿",
  Spain: "🇪🇸", Haiti: "🇭🇹", Canada: "🇨🇦",
  USA: "🇺🇸", "Czech Republic": "🇨🇿", Iran: "🇮🇷",
  Uruguay: "🇺🇾", Scotland: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", Colombia: "🇨🇴",
  Croatia: "🇭🇷", Qatar: "🇶🇦", Panama: "🇵🇦",
};
