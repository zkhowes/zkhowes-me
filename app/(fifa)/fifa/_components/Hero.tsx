import Image from "next/image";
import { KIEL_PHOTO } from "../_data/tournament";

/**
 * Full-bleed cinematic hero. "KIEL SUX" carved in engraved gold, "FIFA
 * TOURNAMENT" beneath. Drifting embers, and Kiel lurking as the eternal villain.
 */
export default function Hero({ nations }: { nations: number }) {
  // deterministic ember positions (no Math.random on server)
  const embers = Array.from({ length: 18 }, (_, i) => ({
    left: `${(i * 53 + 7) % 100}%`,
    delay: `${(i * 0.9) % 12}s`,
    duration: `${9 + ((i * 1.7) % 8)}s`,
    size: 2 + (i % 4),
  }));

  return (
    <header className="relative overflow-hidden pt-16 pb-14 sm:pt-24 sm:pb-20 px-5 text-center">
      {/* drifting embers */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {embers.map((e, i) => (
          <span
            key={i}
            className="absolute bottom-0 rounded-full"
            style={{
              left: e.left,
              width: e.size,
              height: e.size,
              background: "radial-gradient(circle, #ffd76a, #e2532b 60%, transparent)",
              animation: `f-ember-drift ${e.duration} linear ${e.delay} infinite`,
            }}
          />
        ))}
      </div>

      {/* Kiel lurking behind the title — the villain */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(560px,92vw)] aspect-square opacity-[0.07]"
        style={{ maskImage: "radial-gradient(circle, black 30%, transparent 68%)" }}
      >
        <Image src={KIEL_PHOTO} alt="" fill className="object-contain grayscale" sizes="560px" priority />
      </div>

      <div className="relative f-rise">
        <p className="f-eyebrow mb-5" style={{ animation: "f-glow 3s ease-in-out infinite" }}>
          World Cup 2026 · The Chosen Fifteen
        </p>

        <h1 className="f-display f-goldtext text-[clamp(3.4rem,15vw,11rem)]">
          KIEL SUX
        </h1>

        <div className="mx-auto my-5 flex items-center justify-center gap-4 max-w-2xl">
          <span className="f-rule flex-1" />
          <span className="f-serif tracking-[0.5em] text-[clamp(0.9rem,3.5vw,1.9rem)] text-[var(--f-cream)] uppercase pl-[0.5em]">
            Fifa Tournament
          </span>
          <span className="f-rule flex-1" />
        </div>

        <p className="mx-auto max-w-xl text-[var(--f-muted)] text-sm sm:text-base tracking-wide font-light">
          Fifteen rivals. {nations} nations drafted. One eternal villain.
          <br className="hidden sm:block" />
          Glory to the champion — and everlasting shame to Kiel.
        </p>
      </div>
    </header>
  );
}
