import Link from "next/link";
import { LucideIcon } from "lucide-react"

interface DrawerLinkProps {
    page: string;
    icon: LucideIcon;
    iconName: string;
    isActive: boolean;
    iconStyle: string;
}

export default function DrawerLink({ page,icon: Icon, iconName, isActive, iconStyle }: DrawerLinkProps) {

    return (
        <Link href={page} className={`hidden md:flex p-3 rounded-lg hover:bg-[#8F9C68] ${isActive && "bg-[#8F9C68]"}`}>
            <Icon className={iconStyle}/>{iconName}
        </Link>
    )
}