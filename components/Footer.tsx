import Image from "next/image";

export default function Footer() {
  return (
    <footer>
      <div className="panel-border overflow-hidden">
        <Image
          src="/images/zkhowes-footer.png"
          alt="Scribbles"
          width={3246}
          height={487}
          style={{ width: "100%", height: "auto", display: "block" }}
          priority={false}
        />
      </div>
      <p className="px-1 pt-2 text-sm opacity-60">
        © {new Date().getFullYear()} zkhowes.ai. Made with Claude, a Leuchtturm1917 notebook, and a Lamy Allstar pen.
      </p>
    </footer>
  );
}
