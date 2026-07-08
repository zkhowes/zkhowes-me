"use client";

import Image from "next/image";
import { useState } from "react";
import { TEAM_FLAGS } from "../_data/tournament";
import type { Bracket, BracketMatch, MatchSide } from "../_data/standings";

const STAGE_LABEL: Record<string, string> = {
  QUARTER_FINALS: "Quarter-Final",
  SEMI_FINALS: "Semi-Final",
  THIRD_PLACE: "Play-off for Third",
  FINAL: "Final",
};

function formatDate(date: string | null, time: string | null) {
  if (!date) return "TBD";
  try {
    const d = new Date(`${date}T${time ?? "12:00"}:00Z`).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    });
    return time ? `${d} · ${time}` : d;
  } catch {
    return date;
  }
}

/** One team's line in the bracket: flag + team name + the drafting player's
 *  photo inline. Winners glow gold; the losing side dims and strikes through.
 *  A null side is a not-yet-decided slot (renders the bracket source label). */
function PlaceholderRow({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 min-h-[2.5rem]">
      <span className="w-5 h-5 rounded-full bg-white/5 shrink-0" />
      <span className="f-num text-xs tracking-wide text-[var(--f-muted)]/60">{label}</span>
    </div>
  );
}

function TeamRow({
  side,
  won,
  played,
}: {
  side: MatchSide;
  won: boolean;
  played: boolean;
}) {
  const dim = played && !won;
  const [show, setShow] = useState(false);
  const owner = side.ownerName;

  return (
    <button
      type="button"
      onClick={() => setShow((v) => !v)}
      title={owner ? `Drafted by ${owner}` : "Undrafted"}
      className="group w-full flex items-center gap-2 px-3 py-2 min-h-[2.5rem] text-left hover:bg-white/[0.03]"
      style={{ opacity: dim ? 0.5 : 1 }}
    >
      <span className="text-base leading-none shrink-0">{TEAM_FLAGS[side.team] ?? "⚽"}</span>
      <span className="min-w-0 flex-1">
        <span
          className={`f-serif text-sm truncate block ${
            won ? "text-[var(--f-gold)]" : dim ? "text-[var(--f-muted)] line-through decoration-1" : "text-[var(--f-cream)]"
          }`}
        >
          {side.team}
        </span>
        {/* owner name: revealed on row hover (desktop) or tap (mobile) */}
        <span
          className={`f-num text-[0.6rem] tracking-wide text-[var(--f-muted)] truncate transition-all overflow-hidden ${
            show ? "block max-h-4 mt-0.5" : "max-h-0 group-hover:max-h-4 group-hover:mt-0.5"
          }`}
        >
          {owner ?? "undrafted"}
        </span>
      </span>
      {side.ownerPhoto ? (
        <span
          className="relative w-6 h-6 rounded-full overflow-hidden border shrink-0"
          style={{ borderColor: won ? "var(--f-gold)" : "var(--f-line)" }}
        >
          <Image src={side.ownerPhoto} alt={side.ownerName ?? ""} fill className="object-cover" sizes="24px" />
        </span>
      ) : (
        <span className="w-6 h-6 shrink-0" />
      )}
    </button>
  );
}

function MatchCard({ m }: { m: BracketMatch }) {
  return (
    <div className="f-panel overflow-hidden w-full">
      <div className="flex items-center justify-between px-3 pt-2 pb-1.5">
        <span className="f-eyebrow text-[0.5rem] tracking-[0.22em] text-[var(--f-muted)]">
          {STAGE_LABEL[m.stage] ?? m.slot}
        </span>
        <span className="f-num text-[0.6rem] text-[var(--f-muted)]/70">{formatDate(m.date, m.time)}</span>
      </div>
      <div className="divide-y divide-[var(--f-line)]">
        {m.home ? (
          <TeamRow side={m.home} won={m.homeWon} played={m.played} />
        ) : (
          <PlaceholderRow label={`Winner ${m.slot}·A`} />
        )}
        {m.away ? (
          <TeamRow side={m.away} won={m.awayWon} played={m.played} />
        ) : (
          <PlaceholderRow label={`Winner ${m.slot}·B`} />
        )}
      </div>
    </div>
  );
}

export default function Bracket({ bracket }: { bracket: Bracket | null }) {
  if (!bracket) return null;
  const { leftQF, rightQF, semis, final, thirdPlace } = bracket;
  const leftSF = semis[0] ?? null;
  const rightSF = semis[1] ?? null;

  return (
    <section className="px-4 sm:px-5 pb-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center gap-4 mb-6">
          <span className="f-rule flex-1" />
          <h2 className="f-serif uppercase tracking-[0.32em] text-[var(--f-gold)] text-sm sm:text-base whitespace-nowrap">
            The Bracket
          </h2>
          <span className="f-rule flex-1" />
        </div>

        {/* Desktop: left QFs | center (Final / SFs / 3rd) | right QFs.
            Mobile: single column, grouped by round. */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6 lg:items-center">
          {/* Left quarter-finals */}
          <div className="flex flex-col gap-4 lg:gap-16">
            <RoundHeading className="lg:hidden">Quarter-Finals</RoundHeading>
            {leftQF.map((m) => (
              <MatchCard key={m.slot} m={m} />
            ))}
          </div>

          {/* Center column: Final on top, semis in the middle, third place below */}
          <div className="flex flex-col gap-4 order-first lg:order-none">
            {final && (
              <div>
                <RoundHeading>Final</RoundHeading>
                <MatchCard m={final} />
              </div>
            )}
            <div>
              <RoundHeading>Semi-Finals</RoundHeading>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {leftSF && <MatchCard m={leftSF} />}
                {rightSF && <MatchCard m={rightSF} />}
              </div>
            </div>
            {thirdPlace && (
              <div>
                <RoundHeading>Third Place</RoundHeading>
                <MatchCard m={thirdPlace} />
              </div>
            )}
          </div>

          {/* Right quarter-finals */}
          <div className="flex flex-col gap-4 lg:gap-16">
            <RoundHeading className="lg:hidden">Quarter-Finals</RoundHeading>
            {rightQF.map((m) => (
              <MatchCard key={m.slot} m={m} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function RoundHeading({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`f-eyebrow text-[0.6rem] tracking-[0.25em] text-center text-[var(--f-muted)] mb-2 ${className}`}>
      {children}
    </p>
  );
}
