'use client'

import { usePathname } from "next/navigation";
import NavLink from "@/modules/layout/components/bottom-nav/components/NavLink";
import {navLinks} from "@/lib/nav-links";
import FilterButton from "@/modules/layout/components/filter-button";

export default function BottomNav(){
    const src = usePathname();

    return (
        <nav className="md:hidden z-10 flex fixed bottom-0 left-0 right-0 h-16 bg-[var(--color-primary)] shadow-lg justify-around items-center">
            {navLinks.map((e, idx) => (
                <NavLink
                    key={idx}
                    icon={e.icon}
                    iconName={e.name}
                    page={e.page}
                    isActive={src == `${e.page}`}
                    iconStyle={`w-4 h-4 flex-shrink-0 transform transition duration-500 ease-in-out
                     group-active:text-[var(--color-tertiary)] ${src == e.page ? "text-[var(--color-tertiary)]" : "text-white"}`}/>
            ))}
        <FilterButton style={"absolute justify-items-center bottom-25 right-5 p-2 bg-[var(--color-primary)] rounded-full "}/>
        </nav>)
}