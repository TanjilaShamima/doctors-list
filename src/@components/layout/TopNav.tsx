"use client";
import Logo from "@/@assets/logo.svg";
import ProfileImage from "@/@assets/profile-placeholder.png";
import { NAV_ITEMS, NavItem } from "@/@contents/navigation";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import setting from '@/@assets/setting.png';
import more from '@/@assets/more.png';
import { t } from "@/lib/i18n";
import type { FlattenedKeys } from "@/lib/i18n";

// Items provided via @contents/navigation

function TopNavInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const currentFullHref =
    pathname + (searchParams.size ? `?${searchParams.toString()}` : "");
  const isActive = (item: NavItem) => {
    if (!tab && pathname === "/" && item.labelKey === "navigation.patients") return true;
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
                      alt={t(item.labelKey as FlattenedKeys)}
                      width={16}
                      height={16}
                    />
                  </span>
                )}
                <span className="ml-1 text-brand-deep font-bold text-sm">
                  {t(item.labelKey as FlattenedKeys)}
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
    <nav className="flex items-center gap-8 w-full">
      <div className="flex items-center gap-2 min-w-[200px]">
        <Image
          src={Logo}
          alt="Logo"
          width={250}
          height={40}
          className="h-10 w-auto rounded-full object-cover"
        />
      </div>
      <Suspense
        fallback={
          <div className="text-xs text-gray-500 ml-auto mr-auto">
            {t('common.loading')}
          </div>
        }
      >
        <TopNavInner />
      </Suspense>
      <div className="flex items-center gap-4 ml-auto">
        <div className="flex items-center gap-3 pr-4 border-r border-gray-200">
          <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-200">
            <Image
              src={ProfileImage}
              alt={t('doctor.name')}
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
          <div className="leading-tight">
            <p className="text-sm text-brand-deep font-bold">
              {t('doctor.name')}
            </p>
            <p className="text-sm text-brand-deep">
              {t('doctor.title')}
            </p>
          </div>
        </div>
        <button
          aria-label={t('aria.settings')}
          className="flex items-center justify-center text-gray-600 hover:text-brand-deep transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-teal focus-visible:ring-offset-2 rounded-md p-1"
        >
          <Image
            src={setting}
            alt={t('aria.settings')}
            width={20}
            height={20}
          />
        </button>
        <button
          aria-label={t('aria.more')}
          className="flex items-center justify-center text-brand-deep hover:opacity-70 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-teal focus-visible:ring-offset-2 rounded-md p-1"
        >
          <Image
            src={more}
            alt={t('aria.more')}
            width={3}
            height={20}
          />
        </button>
      </div>
    </nav>
  );
}
