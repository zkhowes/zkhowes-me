import { STAKES } from "../_data/tournament";

/** The stakes ticker — what everyone's actually playing for. */
export default function MoneyPanel({ leader }: { leader: string }) {
  const items = [
    { big: `$${STAKES.pointsLeaderPrize}`, label: "Most Points", sub: `${leader} leads the hunt` },
    { big: `$${STAKES.worldCupWinnerBonus}`, label: "World Cup Winner", sub: "to the champion's owner" },
    { big: `$${STAKES.entryPerTeam}`, label: "Entry Per Team", sub: "blood in, glory out" },
  ];
  return (
    <section className="px-5 pb-14">
      <div className="mx-auto max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-3">
        {items.map((it) => (
          <div key={it.label} className="f-panel px-5 py-6 text-center">
            <div className="f-display f-goldtext text-4xl sm:text-5xl">{it.big}</div>
            <div className="f-eyebrow mt-3">{it.label}</div>
            <div className="text-xs text-[var(--f-muted)] mt-1.5 font-light">{it.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
