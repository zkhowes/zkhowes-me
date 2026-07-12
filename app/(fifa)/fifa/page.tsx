import Hero from "./_components/Hero";
import Podium from "./_components/Podium";
import Bracket from "./_components/Bracket";
import MatchDay from "./_components/MatchDay";
import Leaderboard from "./_components/Leaderboard";
import MoneyPanel from "./_components/MoneyPanel";
import { computeStandings } from "./_data/standings";
import { PLAYERS } from "./_data/tournament";

// Re-render at most once a minute during the tournament so possible-points
// never lag a played match by more than ~60s (upstream football-data is still
// fetched with its own hourly revalidate, so this adds no API-rate pressure).
export const revalidate = 60;

function formatSynced(iso: string) {
  try {
    return new Date(iso).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

export default async function FifaPage() {
  const { standings, lastUpdated, source, finishedMatches, latestDay, latestMatches, bracket, tournamentComplete } =
    await computeStandings(new Date().toISOString());

  const top3 = standings.slice(0, 3);
  const rest = standings.slice(3);
  const nations = PLAYERS.length * 3;

  return (
    <main>
      <Hero nations={nations} />
      <Podium top3={top3} complete={tournamentComplete} />
      <Bracket bracket={bracket} />
      <MatchDay day={latestDay} matches={latestMatches} />
      <Leaderboard rest={rest} />
      <MoneyPanel leader={standings[0]?.name ?? "—"} />

      {/* sync + ledger note */}
      <footer className="px-5 pb-16 text-center">
        <div className="mx-auto max-w-2xl f-rule mb-6" />
        <p className="f-eyebrow tracking-[0.3em] mb-2">
          {source === "live"
            ? `Live · ${finishedMatches} matches scored`
            : "Awaiting kickoff data"}
        </p>
        <p className="text-xs text-[var(--f-muted)] font-light">
          {source === "live"
            ? `Recomputed from finished World Cup 2026 results · synced ${formatSynced(lastUpdated)}`
            : "Showing the current spreadsheet standings. Live scores light up automatically once results publish."}
        </p>
        <p className="text-[0.65rem] text-[var(--f-muted)]/70 font-light mt-3 max-w-md mx-auto">
          Standings are computed live for the fun of it. Tim&apos;s master
          spreadsheet remains the official ledger of record for all payouts.
        </p>
      </footer>
    </main>
  );
}
