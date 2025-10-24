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
            <header className="relative h-16 mx-auto duration-200 bg-[var(--color-primary)] shadow-md">
                <nav className="content-container flex items-center justify-between w-full h-full text-small-regular px-4">
                    <FilterButton style="hidden md:flex"/>

                    {/*logo*/}
                    <Link href="/" className="flex flex-row justify-self-center focus:border-none">
                        <div className="flex items-center h-full gap-x-2 uppercase">
                            <h1 className="md:hidden flex text-xl font-bold text-white">{
                                navLinks.map(e => src == e.page ? `${e.name}` : null)
                            }</h1>
                            <h1 id="brand-name" className="hidden md:flex text-2xl font-bold text-gray-100">CRIMAP</h1>
                        </div>
                        <Fingerprint id="brand-logo" className="flex ml-4 my-auto text-[var(--color-secondary)]"/>
                    </Link>

                    <button className={`flex items-center justify-self-end gap-x-6 h-full hidden md:flex`} onClick={toggleDrawer}>
                        <div id="menuBtn" className="focus:outline-none group p-2 rounded-full active:bg-[var(--color-tertiary)]
                            hover:bg-[var(--color-tertiary)] cursor-pointer duration-300">
                            <Menu className=" text-white group-active:text-[var(--color-primary)]"/>
                        </div>
                    </button>
                </nav>
            </header>
        </div>
    )
}

