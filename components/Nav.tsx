"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "ABOUT",   href: "/about",              img: "/images/menu-about.png",   external: false },
  { label: "CONTACT", href: "/contact",             img: "/images/menu-contact.png", external: false },
  { label: "FUN",     href: "https://zkhowes.fun",  img: "/images/menu-fun.png",     external: true  },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main navigation">
      <ul className="list-none flex flex-col gap-3 mt-6">
        {navItems.map((item) => {
          const isActive = !item.external && pathname === item.href;
          const img = (
            <Image
              src={item.img}
              alt={item.label}
              width={698}
              height={115}
              style={{ width: "100%", height: "auto", display: "block", opacity: isActive ? 1 : 0.55 }}
            />
          );

          if (item.external) {
            return (
              <li key={item.href}>
                <a href={item.href} target="_blank" rel="noopener noreferrer" className="nav-item-link">
                  {img}
                </a>
              </li>
            );
          }

          return (
            <li key={item.href}>
              <Link href={item.href} aria-current={isActive ? "page" : undefined} className="nav-item-link">
                {img}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
