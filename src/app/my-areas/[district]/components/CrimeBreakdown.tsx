"use client";
{/*
This component shows a chart breaking down crimes by type for a selected time period.
It runs in the browser (client-side) and works with crime data. Here's how it works:

1. Take the list of crime records (rows) as input, an array of objects like:
   - { offence_name: string, count: number, date: string }[].
2. Find all unique quarter dates (string[]) from the data and sort them from newest to oldest.
3. Pick the newest quarter as the default, but let the user change it with a dropdown menu.
4. For the selected quarter:
   - Filter the data to only include records from that quarter, resulting in a subset array.
   - Use a reduce function to add up the counts for each offence type, creating a Record<string, number>
     - (e.g., { "Theft": 35, "Assault": 20 }).
   - Sort the offence counts (array of [string, number] pairs) descending.
   - Take the top 9 offences and group the rest into an "Other" category, producing new arrays for labels and data.
5. Prepare the chart data:
   - Use offence names (string[]) as labels.
   - Use the counts (number[]) as data values.
6. Create a dropdown menu with quarter options (e.g., "April to June 2019") that updates the chart when changed.
7. Show the chart inside a styled box with a title "Crime Breakdown by Type".
This lets users see which crimes are most common in a specific quarter easily using filtered and aggregated data.
*/}


import { useState } from "react";
import CrimeChart from "./CrimeChart";

interface CrimeBreakdownProps {
    rows: { offence_name: string; count: number; date: string }[];
}

export default function CrimeBreakdown({ rows }: CrimeBreakdownProps) {
    // Extract unique quarters sorted descending
    const quarters = Array.from(new Set(rows.map((row) => row.date))).sort(
        (a, b) => new Date(b).getTime() - new Date(a).getTime()
    );

    const [selectedQuarter, setSelectedQuarter] = useState(quarters[0] || "");

    // Filter rows for selected quarter and aggregate by offence
    const filteredRows = rows.filter((row) => row.date === selectedQuarter);
    const crimeData = filteredRows.reduce((acc, row) => {
        acc[row.offence_name] = (acc[row.offence_name] || 0) + row.count;
        return acc;
    }, {} as Record<string, number>);

    // Sort by count descending and take top 9, aggregate rest as 'Other'
    const sortedCrimes = Object.entries(crimeData).sort((a, b) => b[1] - a[1]);
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