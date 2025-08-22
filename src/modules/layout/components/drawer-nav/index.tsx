'use client'

import Link from "next/link";
import { navLinks } from "@/lib/nav-links"
import { useMenu } from "@/modules/layout/providers/LayoutClientWrapper";
import DrawerLink from "@/modules/layout/components/drawer-nav/components/DrawerLink"
import { usePathname } from "next/navigation";
import { Bolt, X } from "lucide-react";

export default function DrawerNav(){
    // consuming state values form context provider
    const { isDrawerOpen, toggleDrawer } = useMenu();
    const src = usePathname();

    return (
        <>
            <div className={`${!isDrawerOpen && "translate-x-full"} duration-300 transition ease-in-out fixed top-0 right-0 h-full w-3/4 max-w-xs 
            bg-[#1E4B26] text-white shadow-lg z-30 p-6`}>
                <button className="flex group items-center justify-self-end" onClick={toggleDrawer}>
                    <div className="focus:outline-none p-2 rounded-full active:bg-[#8F9C68]
                        hover:bg-[#8F9C68] cursor-pointer duration-300">
                        <X className="cursor-pointer group-active:text-[#1E4B26]"/>
                    </div>
                </button>

                <div className="space-y-4 mt-10">

                    {navLinks.map((e, idx) => (
                        <DrawerLink
                            key={idx}
                            icon={e.icon}
                            iconName={e.name}
                            page={e.page}
                            isActive={src == e.page}
                            iconStyle={`mr-2 w-4 h-4 flex-shrink-0 group-active:text-[#1E4B26] duration-300 
                                ${src == e.page ? "text-[#1E4B26]" : "text-white"}`}/>
                    ))}
                    <Link href="/settings" className={`flex p-3 rounded-lg align-middle hover:bg-[#8F9C68] 
                        ${src == "/settings" && "bg-[#8F9C68]"}`}>
                        <Bolt className={`mr-2 w-4 h-4 flex-shrink-0 ${src == "/settings" ? "text-[#1E4B26]" :
                            "text-white"}`}/>Settings
                    </Link>
                </div>
            </div>

            {/*Overlay*/}
            <div
                className={`fixed inset-0 bg-black ${isDrawerOpen ? "opacity-50 pointer-events-auto " : "opacity-0 pointer-events-none"} 
                transition-opacity duration-300 z-29`}
                onClick={toggleDrawer}
            ></div>
        </>
    )
}