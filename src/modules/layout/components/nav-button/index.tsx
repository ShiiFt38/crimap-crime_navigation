import { useMenu } from "@/modules/layout/providers/LayoutClientWrapper"
import { Menu, EllipsisVertical, X } from "lucide-react"

export default function NavButton({ style, toggle }: {style?: string, toggle: boolean}) {
    // consuming state values form context provider
    const { isDrawerOpen, toggleDrawer } = useMenu()
    return (
        <div className={`flex items-center justify-end ${style}`} onClick={toggleDrawer}>
            <button id="menuBtn" className="focus:outline-none rounded-full ">

                {/*Drawer navigation logic on desktop screens*/}
                {!isDrawerOpen && <Menu className="hidden md:flex cursor-pointer text-white hover:text-[#8F9C68]"/>}

                {/* Drawer navigation logic on mobile screens, the toggle boolean value is defined by two separate
                components (drawer-nav and template/nav) */}
                {toggle ? <X className="hover:text-[#8F9C68]"/> :
                    <EllipsisVertical className="flex md:hidden cursor-pointer text-white hover:text-[#8F9C68]" />}

            </button>
        </div>
    )
}