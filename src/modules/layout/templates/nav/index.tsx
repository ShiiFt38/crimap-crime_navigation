'use client'

import Image from "next/image";
import { useMenu } from "@/modules/layout/providers/LayoutClientWrapper";

export default function Nav() {
    // consuming state values form context provider
    const { toggleFilter, toggleDrawer, isFilterOpen, isDrawerOpen } = useMenu();

    return (
        <div className="sticky top-0 inset-z-0 z-50">
            <header className="relative h-16 mx-auto duration-200 bg-[#1E4B26]">
                <nav className="content-container flex items-center justify-between w-full h-full text-small-regular px-4">

                    {/*filter menu*/}
                    <div className="flex-1 basis-0 h-full flex items-center " onClick={toggleFilter}>
                        <button className="focus:outline-none rounded-full hover:bg-[#8F9C68]">
                            {isFilterOpen ?
                                <Image
                                    src="/filter_alt_off_24dp.svg"
                                    className="cursor-pointer rounded-full m-2"
                                    alt="Close Filter Menu"
                                    width={30}
                                    height={30}/> :
                                <Image
                                    src="/filter_alt_24dp.svg"
                                    className="cursor-pointer rounded-full m-2"
                                    alt="Open Filter Menu"
                                    width={30}
                                    height={30}/>}
                        </button>
                    </div>

                    {/*logo*/}
                        <div className="flex items-center h-full gap-x-2 uppercase">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                            </svg>
                            <h1 className="text-xl font-bold text-white">Uphephe</h1>
                        </div>

                    {/*sitewide navigation*/}
                        <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end" onClick={toggleDrawer}>
                            <button id="menuBtn" className="focus:outline-none rounded-full hover:bg-[#8F9C68]">
                                {isDrawerOpen ?
                                    <Image
                                        src="/menu_open_24dp.svg"
                                        className="cursor-pointer rounded-full m-2 rotate-180"
                                        alt="Close Filter Menu"
                                        width={30}
                                        height={30}/> :
                                    <Image
                                        src="/menu_24dp.svg"
                                        className="cursor-pointer rounded-full m-2"
                                        alt="Close Filter Menu"
                                        width={30}
                                        height={30}/>}
                            </button>
                        </div>
                </nav>
            </header>
        </div>
    )
}