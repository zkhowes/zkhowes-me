import Image from "next/image";
import { TEAM_FLAGS } from "../_data/tournament";
import type { DayMatch, MatchSide } from "../_data/standings";

const STAGE_LABEL: Record<string, string> = {
  GROUP_STAGE: "Group Stage",
  LAST_32: "Round of 32",
  LAST_16: "Round of 16",
  QUARTER_FINALS: "Quarter-Final",
  SEMI_FINALS: "Semi-Final",
  THIRD_PLACE: "Third Place",
  FINAL: "Final",
};

function formatDay(iso: string) {
  try {
    return new Date(iso + "T12:00:00Z").toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    });
  } catch {
    return iso;
  }
}

/** One team's side of a fixture — flag, name, goals, and owner impact chip.
 *  `align="right"` mirrors the layout for the away team so both sides read
 *  inward toward the centered score. */
function Side({ side, won, align = "left" }: { side: MatchSide; won: boolean; align?: "left" | "right" }) {
  const right = align === "right";
  return (
    <div className={`flex items-center gap-2.5 min-w-0 ${right ? "flex-row-reverse" : ""}`}>
      <span className="text-xl leading-none shrink-0">
        {TEAM_FLAGS[side.team] ?? "⚽"}
      </span>
      <div className={`min-w-0 ${right ? "text-right" : ""}`}>
        <div
          className={`f-serif text-sm sm:text-base truncate ${won ? "text-[var(--f-cream)]" : "text-[var(--f-muted)]"}`}
        >
          {side.team}
        </div>
        {side.ownerName ? (
          <div className={`flex items-center gap-1.5 mt-0.5 ${right ? "flex-row-reverse" : ""}`}>
            {side.ownerPhoto && (
              <span className="relative w-4 h-4 rounded-full overflow-hidden border border-[var(--f-line)] shrink-0">
                <Image src={side.ownerPhoto} alt={side.ownerName} fill className="object-cover" sizes="16px" />
              </span>
            )}
            <span className="text-[0.68rem] text-[var(--f-muted)] truncate">
              {side.ownerName}
            </span>
            <span
              className="f-num text-[0.68rem] px-1.5 rounded"
              style={{
                background: side.points > 0 ? "rgba(232,178,58,0.15)" : "rgba(255,255,255,0.05)",
                color: side.points > 0 ? "var(--f-gold)" : "var(--f-muted)",
              }}
            >
              +{side.points}
            </span>
          </div>
        ) : (
          <div className="text-[0.68rem] text-[var(--f-muted)]/50 mt-0.5">undrafted</div>
        )}
      </div>
    </div>
  );
}

export default function MatchDay({
  day,
  matches,
}: {
  day: string | null;
  matches: DayMatch[];
}) {
  if (!day || matches.length === 0) return null;

  // matches arrive newest-first; the span runs from the oldest to newest date.
  const dates = matches.map((m) => m.date);
  const newest = dates[0];
  const oldest = dates[dates.length - 1];
  const label =
    newest === oldest ? formatDay(newest) : `${formatDay(oldest)} – ${formatDay(newest)}`;

  return (
    <section className="px-4 sm:px-5 pb-12 -mt-2">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center gap-4 mb-2">
          <span className="f-rule flex-1" />
          <h2 className="f-serif uppercase tracking-[0.32em] text-[var(--f-gold)] text-sm sm:text-base whitespace-nowrap">
            Latest Results
          </h2>
          <span className="f-rule flex-1" />
        </div>
        <p className="text-center text-xs text-[var(--f-muted)] mb-6">{label}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {matches.map((m, i) => {
            const homeWon = m.home.goals > m.away.goals;
            const awayWon = m.away.goals > m.home.goals;
            return (
              <div
                key={i}
                className="f-panel f-rise px-4 py-3.5"
                style={{ animationDelay: `${Math.min(i * 0.06, 0.5)}s` }}
              >
                {m.stage && STAGE_LABEL[m.stage] && (
                  <div className="f-eyebrow text-[0.55rem] tracking-[0.25em] text-[var(--f-muted)] mb-2.5">
                    {STAGE_LABEL[m.stage]}
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <Side side={m.home} won={homeWon} />
                  </div>
                  <div className="f-num text-2xl text-[var(--f-cream)] tabular-nums shrink-0 px-1">
                    <span className={homeWon ? "" : "text-[var(--f-muted)]"}>{m.home.goals}</span>
                    <span className="text-[var(--f-muted)] mx-1">–</span>
                    <span className={awayWon ? "" : "text-[var(--f-muted)]"}>{m.away.goals}</span>
                  </div>
                  <div className="flex-1 min-w-0 flex justify-end">
                    <Side side={m.away} won={awayWon} align="right" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
