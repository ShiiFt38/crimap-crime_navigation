import { Funnel, FunnelX } from "lucide-react"
import { useMenu } from "@/modules/layout/providers/LayoutClientWrapper"

export default function FilterButton({style}: { style?: string}) {
    const { isFilterOpen, toggleFilter } = useMenu();
    const iconStyle = "cursor-pointer rounded-full m-auto md:m-2 flex-shrink-0 text-white hover:text-[#8F9C68]"

    return (
        <div className={`flex items-center ${style}`} onClick={toggleFilter}>
            <button className="focus:outline-none rounded-full ">
                {isFilterOpen ? <FunnelX className={iconStyle}/> : <Funnel className={iconStyle}/>}
            </button>
        </div>
    )
}