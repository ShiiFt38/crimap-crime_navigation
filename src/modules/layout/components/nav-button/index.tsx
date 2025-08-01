import { useMenu } from "@/modules/layout/providers/LayoutClientWrapper"
import { Menu, EllipsisVertical } from "lucide-react"

export default function NavButton({ style, toggle }: {style?: string, toggle: boolean}) {
    // consuming state values form context provider
    const { toggleDrawer } = useMenu()
    return (
        <div className={`flex items-center justify-end ${style}`} onClick={toggleDrawer}>
            <button id="menuBtn" className="focus:outline-none rounded-full ">
                <Menu className="hidden md:flex cursor-pointer text-white hover:text-[#8F9C68]"/>
                <EllipsisVertical className="flex md:hidden cursor-pointer text-white hover:bg-[#8F9C68]" />
            </button>
        </div>
    )
}