'use client'

import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/nav-links";
import FilterButton from "@/modules/layout/components/filter-button";
import NavButton from "@/modules/layout/components/nav-button";

export default function Nav() {
    const src = usePathname();

    return (
        <div className="sticky top-0 z-20">
            <header className="relative h-16 mx-auto duration-200 bg-[#1E4B26]">
                <nav className="content-container flex items-center justify-between w-full h-full text-small-regular px-4">

                    <FilterButton style="hidden md:flex flex-1 basis-0 h-full " label={false}/>

                    {/*logo*/}
                        <div className="flex items-center h-full gap-x-2 uppercase">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 hidden md:flex text-white" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                            </svg>
                            <h1 className="md:hidden flex text-xl font-bold text-white">{
                                navLinks.map(e => src == e.page ? `${e.name}` : null)
                            }</h1>
                            <h1 className="hidden md:flex text-xl font-bold text-white">Uphephe</h1>
                        </div>

                    <NavButton style="gap-x-6 h-full flex-1 basis-0" toggle={true}/>
                </nav>
            </header>
        </div>
    )
}