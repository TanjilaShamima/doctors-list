// Central navigation items
import Home from '@/@assets/home.png';
import Group from '@/@assets/group.png';
import Calender from '@/@assets/calender.png';
import Message from '@/@assets/chat.png';
import Credit from '@/@assets/credit.png';
import type { StaticImageData } from "next/image";

export interface NavItem {
    labelKey: string; // i18n key instead of hardcoded label
    href: string;
    icon?: StaticImageData; // imported image icon
}

export const NAV_ITEMS: NavItem[] = [
    { labelKey: "navigation.home", href: "/?tab=overview", icon: Home },
    { labelKey: "navigation.patients", href: "/", icon: Group },
    { labelKey: "navigation.schedule", href: "/?tab=schedule", icon: Calender },
    { labelKey: "navigation.message", href: "/?tab=message", icon: Message },
    { labelKey: "navigation.transactions", href: "/?tab=transactions", icon: Credit },
];
