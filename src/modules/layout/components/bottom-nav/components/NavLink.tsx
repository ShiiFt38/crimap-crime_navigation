// TODO: Use font-awesome icons for extensive icon styling

import Image from "next/image";
import Link from "next/link";
import { LucideIcon } from "lucide-react"

interface NavLinkProps {
    page: string;
    icon: LucideIcon;
    iconName: string;
    isActive: boolean;
    iconStyle: string;
}

export default function NavLink({ page,icon: Icon, iconName, isActive, iconStyle }: NavLinkProps) {

    return (
        <Link href={page} className=" flex flex-col items-center justify-center w-1/5">
            <Icon className={iconStyle}/>
            <span className={`text-xs mt-1 ${isActive ? "text-[#8F9C68]" : "text-white"}`}>{iconName}</span>
        </Link>
    )
}