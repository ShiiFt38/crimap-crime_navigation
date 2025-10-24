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
        <Link href={page} className={`hidden md:flex group text-sm p-3 rounded-lg duration-500 
        hover:bg-[var(--color-tertiary)] ${isActive && "bg-[var(--color-tertiary)]"}`}>
            <Icon className={iconStyle}/>{iconName}
        </Link>
    )
}