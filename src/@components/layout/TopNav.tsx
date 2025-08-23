"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

const navItems: NavItem[] = [
  { label: "Overview", href: "/" },
  { label: "Patients", href: "/?tab=patients" },
  { label: "Schedule", href: "/?tab=schedule" },
  { label: "Message", href: "/?tab=message" },
  { label: "Transactions", href: "/?tab=transactions" },
];

export function TopNav() {
  const pathname = usePathname();
  const activeTab =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("tab")
      : null;

  function isActive(item: NavItem) {
    if (item.href === "/" && pathname === "/") return !activeTab;
    if (item.href.startsWith("/?tab=")) {
      const tab = item.href.split("=")[1];
      return activeTab === tab;
    }
    return pathname === item.href;
  }

  return (
    <nav className="flex items-center gap-8 w-full rounded-full bg-white px-4 lg:px-6 h-20 shadow-sm border">
      <div className="flex items-center gap-2 min-w-[160px]">
        <div className="h-10 w-10 rounded-full bg-cyan-600 flex items-center justify-center text-white font-bold">
          T
        </div>
        <span className="text-lg font-semibold tracking-tight">Tech.Care</span>
      </div>
      <ul className="hidden md:flex items-center gap-2 flex-1">
        {navItems.map((item) => {
          const active = isActive(item);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={
                  "px-5 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-colors " +
                  (active
                    ? "bg-teal-400 text-gray-900 shadow-sm"
                    : "text-gray-600 hover:bg-gray-100")
                }
              >
                {item.label === "Patients" && (
                  <span className="inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold">
                    👥
                  </span>
                )}
                {item.label === "Overview" && (
                  <span className="text-base">🏠</span>
                )}
                {item.label === "Schedule" && (
                  <span className="text-base">🗓️</span>
                )}
                {item.label === "Message" && (
                  <span className="text-base">💬</span>
                )}
                {item.label === "Transactions" && (
                  <span className="text-base">💳</span>
                )}
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 pr-4 border-r">
          <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-200">
            {/* Placeholder avatar */}
            <Image
              src="/next.svg"
              alt="doctor"
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
          <div className="hidden sm:block leading-tight">
            <p className="text-sm font-semibold">Dr. Jose Simmons</p>
            <p className="text-xs text-gray-500">General Practitioner</p>
          </div>
        </div>
        <button
          aria-label="Settings"
          className="h-10 w-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600"
        >
          ⚙️
        </button>
        <button
          aria-label="More"
          className="h-10 w-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600"
        >
          ⋮
        </button>
      </div>
    </nav>
  );
}
