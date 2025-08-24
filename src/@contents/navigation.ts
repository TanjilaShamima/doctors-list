// Central navigation items
import Home from '@/@assets/home.png';
import Group from '@/@assets/group.png';
import Calender from '@/@assets/calender.png';
import Message from '@/@assets/chat.png';
import Credit from '@/@assets/credit.png';
import type { StaticImageData } from "next/image";

export interface NavItem {
    label: string;
    href: string;
    icon?: StaticImageData; // imported image icon
}

export const NAV_ITEMS: NavItem[] = [
    { label: "Overview", href: "/?tab=overview", icon: Home },
    { label: "Patients", href: "/", icon: Group },
    { label: "Schedule", href: "/?tab=schedule", icon: Calender },
    { label: "Message", href: "/?tab=message", icon: Message },
    { label: "Transactions", href: "/?tab=transactions", icon: Credit },
];
