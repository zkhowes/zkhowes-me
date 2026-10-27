import Image from "next/image";
import { KIEL_PHOTO, PLAYERS } from "../_data/tournament";

/**
 * The final verdict. Once the tournament is over, Kiel is officially entered
 * into the standings — dead last, below all fifteen real rivals. He didn't
 * play. He still lost. He still sux. The eternal wooden spoon.
 */
export default function KielLast() {
  const lastPlace = PLAYERS.length + 1; // 16th — one below the real field

  return (
    <section className="px-4 sm:px-5 pb-16">
      <div className="mx-auto max-w-4xl">
        <div
          className="f-panel f-rise relative overflow-hidden"
          style={{ borderColor: "rgba(122,31,22,0.7)" }}
        >
          {/* blood wash */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 15% 50%, rgba(122,31,22,0.28), transparent 60%)",
            }}
          />

          <div className="relative flex items-center gap-4 sm:gap-6 px-4 sm:px-7 py-6">
            <span className="f-num w-8 sm:w-12 text-center text-2xl sm:text-4xl text-[var(--f-blood)]">
              {lastPlace}
            </span>

            <div
              className="relative rounded-full overflow-hidden shrink-0"
              style={{
                width: 72,
                height: 72,
                border: "2px solid var(--f-blood)",
                boxShadow: "0 0 30px rgba(122,31,22,0.5)",
              }}
            >
              <Image
                src={KIEL_PHOTO}
                alt="Kiel"
                fill
                className="object-cover grayscale"
                sizes="72px"
              />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="f-serif text-2xl sm:text-3xl tracking-wide text-[var(--f-cream)]">
                  Kiel
                </h3>
                <span
                  className="text-[0.6rem] f-num tracking-[0.2em] px-2 py-0.5 rounded"
                  style={{ background: "var(--f-blood)", color: "#ffd7cf" }}
                >
                  DEAD LAST
                </span>
              </div>
              <p className="f-num text-sm sm:text-base tracking-[0.15em] mt-2" style={{ color: "#ffb199" }}>
                DIDN&apos;T PLAY. STILL LOST. STILL SUX.
              </p>
            </div>

            <div className="text-right shrink-0">
              <div className="f-num text-3xl sm:text-4xl leading-none text-[var(--f-blood)]">
                —
              </div>
              <div className="f-eyebrow text-[0.55rem] tracking-[0.2em] mt-1 text-[var(--f-blood)]">
                forever
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
