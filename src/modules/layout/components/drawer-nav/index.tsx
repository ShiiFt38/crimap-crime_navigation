'use client'

import Image from "next/image";
import Link from "next/link";
import {useMenu} from "@/modules/layout/providers/LayoutClientWrapper";
import DrawerLink from "@/modules/layout/components/drawer-nav/components/DrawerLink"

export default function DrawerNav(){
    const { isDrawerOpen, toggleDrawer } = useMenu();

    const links = [
        {image: "/space_dashboard_24dp.svg", alt: "dashboard page", name: "Dashboard", page: "/"},
        {image: "/area_chart_24dp.svg", alt: "Areas", name: "My Areas", page: "/my-areas"},
        {image: "/lab_profile_24dp.svg", alt: "Reports page", name: "Reports", page: "/reports"},
        {image: "/emergency_home_24dp.svg", alt: "Emergency page", name: "Emergency", page: "/emergency"},
        {image: "/person_24dp.svg", alt: "Account settings", name: "Account", page: "/account"},
    ]

    return (
        <>
            <div className={`drawer ${isDrawerOpen ? null : "collapsed"} fixed top-0 right-0 h-full w-3/4 max-w-xs bg-[#1E4B26] text-white shadow-lg z-30 p-6`}>
                {/*Menu title*/}
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl font-bold">Menu</h2>
                    <button className="p-2 rounded-full"></button>
                </div>

                {/*Menu items*/}
                <div className="space-y-4">
                    {links.map((e, idx) => (
                        <DrawerLink
                            key={idx}
                            img={e.image}
                            imgAlt={e.alt}
                            name={e.name}
                            page={e.page}/>
                    ))}
                    <Link href="/settings" className="flex p-3 rounded-lg hover:bg-[#8F9C68]">
                        <Image
                            src="/settings_24dp.svg"
                            className="mr-2 flex-shrink-0"
                            alt="Settings page"
                            width={15}
                            height={15}/>Settings
                    </Link>
                </div>
            </div>

            {/*Overlay*/}
            <div
                className={`fixed inset-0 bg-black ${isDrawerOpen ? "opacity-50" : "opacity-0"} pointer-events-none 
                transition-opacity duration-300 z-29`}
                onClick={toggleDrawer}
            ></div>
        </>
    )
}