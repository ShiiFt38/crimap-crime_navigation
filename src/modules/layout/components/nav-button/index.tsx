import { useMenu } from "@/modules/layout/providers/LayoutClientWrapper"
import { Menu, EllipsisVertical, X } from "lucide-react"

export default function NavButton({ style, toggle }: {style?: string, toggle: boolean}) {
    // consuming state values form context provider
    const { isDrawerOpen, toggleDrawer } = useMenu()
    return (
        <div className={`flex items-center justify-end ${style}`} onClick={toggleDrawer}>
            <button id="menuBtn" className="focus:outline-none group p-2 rounded-full active:bg-[#8F9C68]
            hover:bg-[#8F9C68] cursor-pointer duration-300">

                {/*Drawer navigation logic on desktop screens*/}
                {!isDrawerOpen && <Menu className="hidden md:flex text-white group-active:text-[#1E4B26]"/>}

                {/* Drawer navigation logic on mobile screens, the toggle boolean value is defined by two separate
                components (drawer-nav and template/nav) */}
                {toggle ? <X className="cursor-pointer group-active:text-[#1E4B26]"/> :
                    <EllipsisVertical className="flex md:hidden text-white group-active:text-[#1E4B26]" />}

            </button>
        </div>
    )
}