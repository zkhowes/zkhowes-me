import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <Link href="/" aria-label="Home">
      <Image
        src="/images/zkhowes-header.png"
        alt="ZKHOWES"
        width={2635}
        height={568}
        style={{ width: "auto", maxHeight: "130px", display: "block" }}
        priority
      />
    </Link>
  );
}
