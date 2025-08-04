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
        <Link href={page} className="group flex flex-col items-center justify-center w-1/5">
            <Icon className={iconStyle}/>
            <span className="text-xs mt-1 text-white">{iconName}</span>
            {isActive && (
                    <span className="absolute bottom-1.5 w-[14px] h-[3px] rounded-full bg-[#8F9C68]" />
                )}
        </Link>
    )
}