"use client";
import Logo from "@/@assets/logo.svg";
import ProfileImage from "@/@assets/profile-placeholder.png";
import { NAV_ITEMS, NavItem } from "@/@contents/navigation";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

// Items provided via @contents/navigation

export function TopNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const currentFullHref =
    pathname + (searchParams.size ? `?${searchParams.toString()}` : "");

  function isActive(item: NavItem) {
    // Default: if no tab specified and we are on root, highlight Patients by default
    if (!tab && pathname === "/" && item.label === "Patients") return true;
    // Otherwise match full href (path + query)
    return item.href === currentFullHref;
  }

  return (
    <nav className="flex items-center gap-8 w-full rounded-full bg-white px-4 lg:px-6 h-20 shadow-sm border">
      <div className="flex items-center gap-2 min-w-[200px]">
        <Image
          src={Logo}
          alt="Logo"
          width={250}
          height={40}
          className="h-10 w-auto rounded-full object-cover"
        />
      </div>
      <ul className="hidden md:flex items-center gap-1 mx-auto">
        {NAV_ITEMS.map((item) => {
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
                {item.icon && (
                  <span className="inline-flex items-center justify-center w-4 h-4 text-[13px]">
                    {item.icon}
                  </span>
                )}
                <span className="ml-1">{item.label}</span>
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
              src={ProfileImage}
              alt="doctor"
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
          <div className="hidden sm:block leading-tight">
            <p className="text-sm text-[#072635] font-semibold">
              Dr. Jose Simmons
            </p>
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
