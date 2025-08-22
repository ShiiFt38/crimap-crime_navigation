'use client'

import Link from 'next/link'
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/nav-links";
import FilterButton from "@/modules/layout/components/filter-button";
import {EllipsisVertical, Fingerprint, Menu} from "lucide-react"
import { useMenu } from "@/modules/layout/providers/LayoutClientWrapper";

export default function Nav() {
    const src = usePathname();
    const { toggleDrawer } = useMenu();

    return (
        <div className="sticky top-0 z-20">
            <header className="relative h-16 mx-auto duration-200 bg-[#1E4B26] shadow-md">
                <nav className="content-container flex items-center justify-between w-full h-full text-small-regular px-4">
                    <FilterButton style="hidden md:flex"/>

                    {/*logo*/}
                    <Link href="/" className="flex flex-row justify-self-center">
                        <div className="flex items-center h-full gap-x-2 uppercase">
                            <h1 className="md:hidden flex text-xl font-bold text-white">{
                                navLinks.map(e => src == e.page ? `${e.name}` : null)
                            }</h1>
                            <h1 id="brand-name" className="hidden md:flex text-2xl font-bold text-gray-100">CRIMAP</h1>
                        </div>
                        <Fingerprint id="brand-logo" className="flex ml-4 my-auto text-[#B05216]"/>
                    </Link>

                    <button className={`flex items-center justify-self-end gap-x-6 h-full`} onClick={toggleDrawer}>
                        <div id="menuBtn" className="focus:outline-none group p-2 rounded-full active:bg-[#8F9C68]
                            hover:bg-[#8F9C68] cursor-pointer duration-300">
                            <Menu className="hidden md:flex text-white group-active:text-[#1E4B26]"/>
                            <EllipsisVertical className="flex md:hidden text-white group-active:text-[#1E4B26]" />
                        </div>
                    </button>
                </nav>
            </header>
        </div>
    )
}

