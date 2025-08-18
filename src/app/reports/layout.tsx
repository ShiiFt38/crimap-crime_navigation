'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ReportsLayout({children}: {children: React.ReactNode}) {
    const src = usePathname();

    return (
        <main className="flex-grow bg-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="bg-white rounded-lg shadow-sm mb-6 ">
                    <div className="flex overflow-x-auto scrollbar-hide">
                        <Link href="/reports"
                            className={`flex-shrink-0 px-4 py-3 text-sm font-medium rounded-lg
                                ${src == "/reports" && "text-[#B05216] border-b-2 border-[#B05216] bg-amber-100"}`}>
                            Reports
                        </Link>
                        <Link href="/reports/report-form"
                            className={`flex-shrink-0 px-4 py-3 text-sm font-medium rounded-lg
                                ${src == "/reports/report-form" && "text-[#B05216] border-b-2 border-[#B05216] bg-amber-100"}`} >
                            Report a Crime
                        </Link>
                    </div>
                </div>
            </div>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
                {children}
            </div>
        </main>
    )
}