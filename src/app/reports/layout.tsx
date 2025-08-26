'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ReportsLayout({children}: {children: React.ReactNode}) {
    const src = usePathname();

    return (
        <main className="flex-grow bg-gray-100 min-h-[100vh]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
                    <div className=" bg-white rounded-lg shadow-sm">
                        <div className="flex overflow-x-auto bg-[#B05216] border-b-2 border-[#4F2915] rounded-lg scrollbar-hide">
                            <Link href="/reports"
                                  className={`text-white px-4 py-3 text-sm font-medium rounded-lg transition transform 
                            duration-500 ease-in-out active:bg-[#4F2915] 
                                ${src == "/reports" && " text-gray-700 bg-[#4F2915]"}`}>
                                Reports
                            </Link>
                            <Link href="/reports/report-form"
                                  className={`text-white px-4 py-3 text-sm font-medium rounded-lg transition transform 
                            duration-500 ease-in-out active active:bg-[#4F2915]
                                ${src == "/reports/report-form" && " text-gray-700 bg-[#4F2915]"}`} >
                                Report a Crime
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
                {children}
            </div>
        </main>
    )
}