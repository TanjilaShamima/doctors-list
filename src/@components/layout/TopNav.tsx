"use client";
import Logo from "@/@assets/logo.svg";
import more from "@/@assets/more.png";
import ProfileImage from "@/@assets/profile-placeholder.png";
import setting from "@/@assets/setting.png";
import { NAV_ITEMS, NavItem } from "@/@contents/navigation";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";

// Items provided via @contents/navigation

function TopNavInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const currentFullHref =
    pathname + (searchParams.size ? `?${searchParams.toString()}` : "");
  const isActive = (item: NavItem) => {
    if (!tab && pathname === "/" && item.label === "Patients") return true;
    return item.href === currentFullHref;
  };
  return (
    <>
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
                    ? "bg-accent-teal text-gray-900 shadow-sm"
                    : "text-gray-600 hover:bg-gray-100")
                }
              >
                {item.icon && (
                  <span className="inline-flex items-center justify-center w-4 h-4">
                    <Image
                      src={item.icon}
                      alt={item.label}
                      width={16}
                      height={16}
                    />
                  </span>
                )}
                <span className="ml-1 text-brand-deep font-bold text-sm">
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export function TopNav() {
  return (
    <nav className="flex items-center gap-8 w-full rounded-full px-4 lg:px-6 h-20">
      <div className="flex items-center gap-2 min-w-[200px]">
        <Image
          src={Logo}
          alt="Logo"
          width={250}
          height={40}
          className="h-10 w-auto rounded-full object-cover"
        />
      </div>
      <Suspense fallback={null}>
        <TopNavInner />
      </Suspense>
      <div className="flex items-center gap-4 ml-auto">
        <div className="flex items-center gap-3 pr-4 border-r">
          <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-200">
            <Image
              src={ProfileImage}
              alt="doctor"
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
          <div className="leading-tight">
            <p className="text-sm text-brand-deep font-bold">
              Dr. Jose Simmons
            </p>
            <p className="text-sm text-brand-deep">General Practitioner</p>
          </div>
        </div>
        <button
          aria-label="Settings"
          className="flex items-center justify-center text-brand-deep cursor-pointer"
        >
          <Image src={setting} alt="Settings" width={20} height={20} />
        </button>
        <button
          aria-label="More"
          className="flex items-center justify-center text-brand-deep cursor-pointer"
        >
          <Image src={more} alt="More" width={3} height={20} />
        </button>
      </div>
    </nav>
  );
}
