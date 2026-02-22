import Image from "next/image";

export default function Footer() {
  return (
    <footer className="panel-border overflow-hidden">
      <Image
        src="/images/zkhowes-footer.png"
        alt="Scribbles"
        width={3246}
        height={487}
        style={{ width: "100%", height: "auto", display: "block" }}
        priority={false}
      />
      <p className="px-4 py-3 text-sm">
        © {new Date().getFullYear()} Zach Howes. Made with Claude.
      </p>
    </footer>
  );
}
