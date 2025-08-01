import { LucideIcon } from "lucide-react";
import { LayoutDashboard, LandPlot, FileText, BellElectric, User } from "lucide-react";

export type NavLinkItem = {
    icon: LucideIcon;
    alt: string;
    name: string;
    page: string;
};

// Settings link is not included because it is not part of the bottom navigation
export const navLinks: NavLinkItem[] = [
    { icon: LayoutDashboard, alt: "dashboard page", name: "Dashboard", page: "/" },
    { icon: LandPlot, alt: "Areas", name: "My Areas", page: "/my-areas" },
    { icon: FileText, alt: "Reports page", name: "Reports", page: "/reports" },
    { icon: BellElectric, alt: "Emergency page", name: "Emergency", page: "/emergency" },
    { icon: User, alt: "Account settings", name: "Account", page: "/account" },
];
