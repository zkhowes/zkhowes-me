import Image from "next/image";
import CountUp from "./CountUp";
import { STAKES, TEAM_FLAGS } from "../_data/tournament";
import type { Standing } from "../_data/standings";

const TIERS = [
  { key: "gold",   ring: "#ffd76a", glow: "rgba(255,215,106,0.55)", inProgress: "1st Place", final: "Champion",   order: "sm:order-2", scale: "sm:scale-[1.14]" },
  { key: "silver", ring: "#cfd3dc", glow: "rgba(207,211,220,0.4)",  inProgress: "2nd Place", final: "Runner-Up",  order: "sm:order-1", scale: ""               },
  { key: "bronze", ring: "#cd8a4e", glow: "rgba(205,138,78,0.4)",   inProgress: "3rd Place", final: "Third",      order: "sm:order-3", scale: ""               },
] as const;

export default function Podium({
  top3,
  complete = false,
}: {
  top3: Standing[];
  complete?: boolean;
}) {
  return (
    <section className="px-5 pt-4 pb-8 sm:pb-16">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 items-end">
          {top3.map((p, i) => {
            const tier = TIERS[i];
            return (
              <div
                key={p.id}
                className={`f-rise ${tier.order} flex flex-col items-center ${tier.scale}`}
                style={{ animationDelay: `${0.2 + i * 0.18}s` }}
              >
                <span className="f-eyebrow mb-3" style={{ color: tier.ring }}>
                  {complete ? tier.final : tier.inProgress}
                </span>

                {/* portrait */}
                <div className="relative">
                  {/* crown only crowns a true champion — i.e. once it's over */}
                  {i === 0 && complete && (
                    <span className="absolute -top-9 left-1/2 -translate-x-1/2 text-4xl" style={{ animation: "f-glow 2.4s ease-in-out infinite" }}>
                      👑
                    </span>
                  )}
                  <div
                    className="relative rounded-full overflow-hidden"
                    style={{
                      width: i === 0 ? 172 : 132,
                      height: i === 0 ? 172 : 132,
                      border: `3px solid ${tier.ring}`,
                      boxShadow: `0 0 44px ${tier.glow}, inset 0 0 0 6px rgba(0,0,0,0.3)`,
                    }}
                  >
                    <Image src={p.photo} alt={p.name} fill className="object-cover" sizes="180px" />
                  </div>
                  <span
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 f-num text-sm px-3 py-0.5 rounded-full text-black"
                    style={{ background: tier.ring }}
                  >
                    #{i + 1}
                  </span>
                </div>

                <h3 className="f-serif text-2xl mt-5 tracking-wide" style={{ color: tier.ring }}>
                  {p.name}
                </h3>

                <div className="flex items-baseline gap-1.5 mt-1">
                  <CountUp value={p.points} className="f-num text-4xl text-[var(--f-cream)]" />
                  <span className="f-eyebrow text-[0.6rem] tracking-[0.2em] text-[var(--f-muted)]">pts</span>
                  <span
                    className="f-num text-xs text-[var(--f-muted)]/70 ml-0.5"
                    title={p.possible > 0 ? `Up to ${p.possible} more points still attainable` : "All teams eliminated"}
                  >
                    +{p.possible}
                  </span>
                </div>

                {i === 0 && (
                  <span className="mt-2 f-num text-xs tracking-widest text-[var(--f-gold)]">
                    ${STAKES.pointsLeaderPrize} ON THE LINE
                  </span>
                )}

                {/* the player's drafted teams */}
                <div className="mt-4 flex flex-wrap justify-center gap-1.5 max-w-[240px]">
                  {p.teams.map((t) => (
                    <span
                      key={t.name}
                      className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[0.7rem] f-num tracking-wide"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: `1px solid ${tier.ring}33`,
                        opacity: t.alive ? 1 : 0.45,
                      }}
                      title={
                        t.alive
                          ? `${t.name} — ${t.points} pts · still alive (up to +${t.possible})`
                          : `${t.name} — ${t.points} pts · eliminated`
                      }
                    >
                      <span className="text-xs leading-none">{TEAM_FLAGS[t.name] ?? "⚽"}</span>
                      <span className={t.alive ? "text-[var(--f-cream)]" : "text-[var(--f-muted)] line-through decoration-1"}>
                        {t.name}
                      </span>
                      <span className="text-[var(--f-gold)]">{t.points}</span>
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
