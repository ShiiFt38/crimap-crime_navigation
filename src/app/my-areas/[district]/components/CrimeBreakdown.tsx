// app/my-areas/[district]/components/CrimeBreakdown.tsx
"use client";

import { useMemo, useState } from "react";
import dynamic from 'next/dynamic'; // For lazy loading

const CrimeChart = dynamic(() => import("./CrimeChart"), { ssr: false }); // Lazy load the chart

interface CrimeBreakdownProps {
    rows: { offence_name: string; count: number; date: string }[];
}

export default function CrimeBreakdown({ rows }: CrimeBreakdownProps) {
    // Memoize unique quarters
    const quarters = useMemo(() => Array.from(new Set(rows.map((row) => row.date))).sort(
        (a, b) => new Date(b).getTime() - new Date(a).getTime()
    ), [rows]);

    const [selectedQuarter, setSelectedQuarter] = useState(quarters[0] || "");

    // Memoize filtered rows and aggregation
    const filteredRows = useMemo(() => rows.filter((row) => row.date === selectedQuarter), [rows, selectedQuarter]);
    const crimeData = useMemo(() => filteredRows.reduce((acc, row) => {
        acc[row.offence_name] = (acc[row.offence_name] || 0) + row.count;
        return acc;
    }, {} as Record<string, number>), [filteredRows]);

    // Memoize sorted crimes and other sum
    const sortedCrimes = useMemo(() => Object.entries(crimeData).sort((a, b) => b[1] - a[1]), [crimeData]);
    const top9 = sortedCrimes.slice(0, 9);
    const otherSum = sortedCrimes.slice(9).reduce((sum, [_, v]) => sum + v, 0);
    const finalLabels = [...top9.map(([k]) => k), ...(otherSum > 0 ? ['Other'] : [])];
    const finalData = [...top9.map(([_, v]) => v), ...(otherSum > 0 ? [otherSum] : [])];

    // Format date to descriptive quarter label (e.g., "April to June 2019")
    const formatQuarter = (dateStr: string) => {
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        let startMonth = '';
        let endMonth = '';
        if (month <= 3) {
            startMonth = 'January';
            endMonth = 'March';
        } else if (month <= 6) {
            startMonth = 'April';
            endMonth = 'June';
        } else if (month <= 9) {
            startMonth = 'July';
            endMonth = 'September';
        } else {
            startMonth = 'October';
            endMonth = 'December';
        }
        return `${startMonth} to ${endMonth} ${year}`;
    };

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Crime Breakdown by Type</h3>
                <select
                    value={selectedQuarter}
                    onChange={(e) => setSelectedQuarter(e.target.value)}
                    className="border border-gray-300 rounded-md p-1 text-sm"
                >
                    {quarters.map((q) => (
                        <option key={q} value={q}>
                            {formatQuarter(q)}
                        </option>
                    ))}
                </select>
            </div>
            <CrimeChart labels={finalLabels} data={finalData} />
        </div>
    );
}