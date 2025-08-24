// Central navigation items
export interface NavItem {
    label: string;
    href: string;
    icon?: string; // simple emoji icon for now
}

export const NAV_ITEMS: NavItem[] = [
    { label: "Overview", href: "/?tab=overview", icon: "🏠" },
    { label: "Patients", href: "/", icon: "👥" },
    { label: "Schedule", href: "/?tab=schedule", icon: "🗓️" },
    { label: "Message", href: "/?tab=message", icon: "💬" },
    { label: "Transactions", href: "/?tab=transactions", icon: "💳" },
];
