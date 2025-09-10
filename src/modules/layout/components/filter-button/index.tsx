import { Funnel, FunnelX } from "lucide-react"
import { useMenu } from "@/modules/layout/providers/LayoutClientWrapper"

export default function FilterButton({style}: { style?: string}) {
    const { isFilterOpen, toggleFilter } = useMenu();
    const iconStyle = "rounded-full m-auto md:m-2 flex-shrink-0 text-white group-active:text-[#1E4B26]"

    return (
        <div className={`group rounded-full hover:bg-[#8F9C68] items-center flex space-around ${style}`}
             onClick={toggleFilter}>
            <button className="focus:outline-none rounded-full cursor-pointer">
                {isFilterOpen ? <FunnelX size={20} className={iconStyle}/> : <Funnel size={20} className={iconStyle}/>}
            </button>
        </div>
    )
}