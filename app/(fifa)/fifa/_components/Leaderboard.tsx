"use client";

import Image from "next/image";
import { useState } from "react";
import { TEAM_FLAGS, KIEL_PHOTO } from "../_data/tournament";
import type { Standing } from "../_data/standings";

// Full-send Kiel roast lines for the bottom of the table.
const KIEL_LINES = [
  "KIEL APPROVES OF THIS PERFORMANCE",
  "KIEL'S FAVORITE PLAYER",
  "SPONSORED BY KIEL",
  "KIEL COULD DO WORSE. BARELY.",
];

function TeamBadges({ teams }: { teams: Standing["teams"] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {teams.map((t) => (
        <span
          key={t.name}
          className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs f-num tracking-wide"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid var(--f-line)",
            opacity: t.alive ? 1 : 0.45,
          }}
          title={
            t.alive
              ? `${t.name} — ${t.points} pts · still alive (up to +${t.possible})`
              : `${t.name} — ${t.points} pts · eliminated`
          }
        >
          <span className="text-sm leading-none">{TEAM_FLAGS[t.name] ?? "⚽"}</span>
          <span className={t.alive ? "text-[var(--f-cream)]" : "text-[var(--f-muted)] line-through decoration-1"}>
            {t.name}
          </span>
          <span className="text-[var(--f-gold)]">{t.points}</span>
        </span>
      ))}
    </div>
  );
}

function Row({ s, rank, isLast }: { s: Standing; rank: number; isLast: boolean }) {
  const [open, setOpen] = useState(false);
  const kielLine = KIEL_LINES[rank % KIEL_LINES.length];

  return (
    <div
      className="f-panel f-rise overflow-hidden transition-colors"
      style={{
        animationDelay: `${Math.min(rank * 0.05, 0.6)}s`,
        borderColor: isLast ? "rgba(122,31,22,0.6)" : undefined,
      }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-3 sm:gap-4 px-3 sm:px-5 py-3 text-left hover:bg-white/[0.03]"
        aria-expanded={open}
      >
        <span className="f-num w-8 sm:w-10 text-center text-lg text-[var(--f-muted)]">
          {rank}
        </span>

        <div
          className="relative rounded-full overflow-hidden shrink-0"
          style={{
            width: 46,
            height: 46,
            border: `2px solid ${isLast ? "var(--f-blood)" : "var(--f-line)"}`,
          }}
        >
          <Image src={s.photo} alt={s.name} fill className={`object-cover ${isLast ? "grayscale" : ""}`} sizes="46px" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="f-serif text-lg sm:text-xl tracking-wide text-[var(--f-cream)] truncate">
              {s.name}
            </span>
            {isLast && (
              <span className="hidden sm:inline text-[0.6rem] f-num tracking-[0.2em] px-2 py-0.5 rounded"
                style={{ background: "var(--f-blood)", color: "#ffd7cf" }}>
                DEAD LAST
              </span>
            )}
          </div>
          <div className="hidden sm:block mt-1.5">
            <TeamBadges teams={s.teams} />
          </div>
        </div>

        {(() => {
          const finalScore = s.possible === 0;
          return (
            <div className="text-right shrink-0 flex items-baseline gap-1.5">
              <div>
                <div
                  className="f-num text-2xl sm:text-3xl leading-none"
                  style={{ color: finalScore ? "var(--f-silver)" : "var(--f-gold)" }}
                  title={finalScore ? "Final score — all teams eliminated" : undefined}
                >
                  {s.points}
                </div>
                <div
                  className="f-eyebrow text-[0.55rem] tracking-[0.2em] mt-1"
                  style={{ color: finalScore ? "var(--f-silver)" : "var(--f-muted)" }}
                >
                  {finalScore ? "final" : "pts"}
                </div>
              </div>
              {!finalScore && (
                <div
                  className="f-num text-xs leading-none text-[var(--f-muted)]/70"
                  title={`Up to ${s.possible} more points still attainable`}
                >
                  +{s.possible}
                </div>
              )}
            </div>
          );
        })()}

        <span className={`text-[var(--f-muted)] transition-transform ${open ? "rotate-180" : ""}`}>▾</span>
      </button>

      {/* mobile badges + expandable per-team breakdown */}
      <div className="sm:hidden px-4 pb-3 -mt-1">
        <TeamBadges teams={s.teams} />
      </div>

      {open && (
        <div className="px-5 pb-4 pt-1 border-t border-[var(--f-line)]">
          <div className="grid grid-cols-3 gap-3 pt-3">
            {s.teams.map((t) => (
              <div key={t.name} className="text-center" style={{ opacity: t.alive ? 1 : 0.5 }}>
                <div className="text-2xl">{TEAM_FLAGS[t.name] ?? "⚽"}</div>
                <div className={`text-xs mt-1 ${t.alive ? "text-[var(--f-cream)]" : "text-[var(--f-muted)] line-through decoration-1"}`}>
                  {t.name}
                </div>
                <div className="f-num text-lg text-[var(--f-gold)]">{t.points}</div>
                <div className="text-[0.6rem] text-[var(--f-muted)]">
                  {t.matches} match{t.matches === 1 ? "" : "es"}
                </div>
                <div className="text-[0.6rem] mt-0.5" style={{ color: t.alive ? "var(--f-gold)" : "var(--f-blood)" }}>
                  {t.alive ? `alive · +${t.possible}` : "eliminated"}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* full-send Kiel stamp on the last-place row */}
      {isLast && (
        <div className="relative border-t border-[var(--f-blood)]/50 bg-[var(--f-blood)]/10 flex items-center gap-3 px-4 py-3 overflow-hidden">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[var(--f-blood)] shrink-0">
            <Image src={KIEL_PHOTO} alt="Kiel" fill className="object-cover" sizes="40px" />
          </div>
          <span
            className="f-num text-sm sm:text-base tracking-[0.15em]"
            style={{ color: "#ffb199" }}
          >
            {kielLine}
          </span>
        </div>
      )}
    </div>
  );
}

export default function Leaderboard({ rest }: { rest: Standing[] }) {
  const lastIdx = rest.length - 1;
  return (
    <section className="px-4 sm:px-5 pb-16">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center gap-4 mb-6">
          <span className="f-rule flex-1" />
          <h2 className="f-serif uppercase tracking-[0.35em] text-[var(--f-gold)] text-sm sm:text-base">
            The Standings
          </h2>
          <span className="f-rule flex-1" />
        </div>

        <div className="flex flex-col gap-2.5">
          {rest.map((s, i) => (
            <Row key={s.id} s={s} rank={i + 4} isLast={i === lastIdx} />
          ))}
        </div>
      </div>
    </section>
  );
}
