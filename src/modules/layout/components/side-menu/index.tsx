'use client'

import { useMenu } from "@/modules/layout/providers/LayoutClientWrapper";
import { BadgeInfo, History, Badge} from "lucide-react";
import Link from "next/link";

export default function SideMenu() {
    // consuming state values form context provider
    const { isFilterOpen } = useMenu();

    return (
        <div className={`sidebar ${isFilterOpen ? null : "collapsed" } fixed top-16 left-0 bottom-0 w-4/5 md:w-80 
        bg-white shadow-lg overflow-y-auto z-10`}>

            {/*Quick filters*/}
            <div className="p-4">
                <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-3">Quick Filters</h2>
                    {/*Crime type*/}
                    <div className="space-y-3">
                        <label className="text-sm font-medium text-gray-700">Crime Type</label>
                        <select name="" id="" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300
                        focus-outline-none focus:ring-[#1E4B26] focus:border-[#1E4B26] sm:text-sm rounded-md border">
                            <option value="all">All Types</option>
                            <option value="theft">Theft</option>
                            <option value="assault">Assault</option>
                            <option value="burglary">Burglary</option>
                            <option value="vandalism">Vandalism</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    {/*Time range*/}
                    <div>
                        <label className="text-sm font-medium text-gray-700">Time Range</label>
                        <select name="" id="" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300
                        focus:outline-none focus:ring-[#1E4B26] focus:border-[#1E4B26] sm:text-sm rounded-md border">
                            <option value="24h">Last 24 Hours</option>
                            <option value="7d">Last 7 Days</option>
                            <option value="30d">Last 30 Days</option>
                            <option value="90d">Last 90 Days</option>
                            <option value="1y">Last Year</option>
                        </select>
                    </div>
                </div>
            </div>

            {/*Crime index*/}
           <div className="px-4">
               <div className="mb-6">
                   <h2 className="text-lg font-semibold mb-2">Crime Index</h2>
                   <div className="bg-gray-100 p-3 rounded-lg">
                       <div className="flex justify-between text-xs text-gray-600 mb-1">
                           <span>Low</span>
                           <span>Medium</span>
                           <span>High</span>
                       </div>
                       <div className="relative">
                           <input
                               type="range"
                               min="0"
                               max="12"
                               className="w-full h-[8px] rounded-[4px] bg-gradient-to-r from-[#4ade80] to-[#f87171]"></input>
                           {/*<div id="crime-index-indicator" className="absolute top-[4px] w-[16px] h-[16px] rounded-[50%]*/}
                           {/* bg-white border-[2px] border-solid border-[#1e40af] translate-x-[50%]"></div>*/}
                       </div>
                       <div className="mt-2 text-center">
                           <span className="text-sm font-medium">Current Area: </span>
                           <span className="text-sm font-bold text-yellow-600">Moderate Risk</span>
                       </div>
                   </div>
               </div>

            {/*Latest Reports*/}
            <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                    <h2 className="text-lg font-semibold">Latest Reports</h2>
                    <Link href="/reports" className="text-sm text-[#B05216] hover:text-[#4F2915] cursor-pointer">View All</Link>
                </div>
                <div className="space-y-3">
                    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                        <div className="flex items-start">
                            <Badge size={16} className="rounded-[50%] text-red-500 mt-1 mr-2"/>
                            <div>
                                <h3 className="font-medium">Theft</h3>
                                <p className="text-sm text-gray-600">Phone snatched near Main St & 5th Ave</p>
                                <div className="flex items-center mt-1 text-xs text-gray-500">
                                    <History size={16} className="mr-2" />
                                    <span>2 hours ago</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/*Safety Tips*/}
            <div className="mb-6">
                <h2 className="text-lg font-semibold mb-3">Local Safety Tips</h2>
                <div className="bg-blue-50 border-blue-200 rounded-lg p-4">
                    <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                            <BadgeInfo size={36} className="mr-4"/>
                            <span>Avoid walking alone at night on Pine Street between 10th and 12th Avenue.</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/*Report Button*/}
            <Link href="/reports/report-form" className="px-10 mx-auto bg-[#B05216] active:bg-[#4F2915] border-b-2 border-[#4F2915]
            text-white font-medium py-2 rounded-lg flex items-center mb-24 justify-center text-sm cursor-pointer">
                Report Incident
            </Link>
        </div>
        </div>
    )
}