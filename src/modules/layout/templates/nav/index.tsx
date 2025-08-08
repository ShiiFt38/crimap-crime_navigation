'use client'

import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/nav-links";
import FilterButton from "@/modules/layout/components/filter-button";
import NavButton from "@/modules/layout/components/nav-button";
import { Fingerprint } from "lucide-react"

export default function Nav() {
    const src = usePathname();

    return (
        <div className="sticky top-0 z-20">
            <header className="relative h-16 mx-auto duration-200 bg-[#1E4B26] shadow-md">
                <nav className="content-container flex items-center justify-between w-full h-full text-small-regular px-4">

                    <FilterButton style="hidden md:flex flex-1 basis-0 h-full "/>

                    {/*logo*/}
                        <div className="flex items-center h-full gap-x-2 uppercase">
                            <h1 className="md:hidden flex text-xl font-bold text-white">{
                                navLinks.map(e => src == e.page ? `${e.name}` : null)
                            }</h1>
                            <h1 id="brand-name" className="hidden md:flex text-2xl font-bold text-gray-100">CRIMAP</h1>
                        </div>
                    <Fingerprint id="brand-logo" className="flex ml-4 text-[#B05216]"/>

                    <NavButton style="gap-x-6 h-full flex-1 basis-0" toggle={false}/>
                </nav>
            </header>
        </div>
    )
}

