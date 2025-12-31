"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "About" },
    { href: "/projects", label: "Projects" },
  ];

  return (
    <nav 
      className="d-flex flex-column p-4" 
      style={{ 
        width: "200px",
        position: "sticky",
        top: "20px",
        alignSelf: "flex-start",
        height: "fit-content",
        borderRight: "1px solid rgba(255, 255, 255, 0.1)",
        backgroundColor: "transparent"
      }}
    >
      <div className="mb-4">
        <h4 className="fw-bold">MB</h4>
      </div>
      <ul className="nav nav-pills flex-column">
        {navLinks.map((link) => (
          <li key={link.href} className="nav-item mb-2">
            <Link
              href={link.href}
              className={`nav-link ${pathname === link.href ? "active" : ""}`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

