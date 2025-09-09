// app/[district]/StatsSummary.tsx

type StatsSummaryProps = {
    rows: { count: number; district_name?: string; station_name?: string; date: string; population: number | null }[];
};

export default function StatsSummary({ rows }: StatsSummaryProps) {
    // Group total crimes by quarter
    const quarters = rows.reduce((acc, row) => {
        const year = row.date.slice(0, 4);
        const month = parseInt(row.date.slice(5, 7));
        const quarterStart = `${year}-${Math.floor((month - 1) / 3) * 3 + 1}-01`; // e.g., 10, 11, 12 -> '2024-10-01'
        if (!acc[quarterStart]) acc[quarterStart] = 0;
        acc[quarterStart] += row.count;
        return acc;
    }, {} as Record<string, number>);

    // Sort dates descending and use the latest
    const sortedDates = Object.keys(quarters).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
    const latestQuarter = sortedDates[0] || '';
    const previousQuarter = sortedDates[1] || '';

    const latestTotalCrimes = quarters[latestQuarter] || 0;
    const previousTotalCrimes = quarters[previousQuarter] || 0;

    const percentageChange = previousTotalCrimes > 0
        ? ((latestTotalCrimes - previousTotalCrimes) / previousTotalCrimes * 100).toFixed(0)
        : 0;

    const stations = new Set(rows.map((row) => row.station_name)).size; // Unique stations

    // Use single population value (consistent across rows)
    const population = rows[0]?.population ?? 10000; // Use district population or fallback

    // Refine crime index based on updated quarterly max (6,000 / 100k)
    const crimeRatePer100k = (latestTotalCrimes / population) * 100000;
    const maxExpectedRate = 6000; // Adjusted to 6,000 / 100k
    const crimeIndex = Math.max(1, Math.min(12,
        (crimeRatePer100k / (maxExpectedRate / 12)) + 1)).toFixed(1);

    // Calculate safety score (inversely related, 0-100%)
    const safetyScore = Math.max(0, Math.min(100, 100 - (
        (parseFloat(crimeIndex) - 1) * 100 / 11))).toFixed(0);

    let level = 'Moderate';
    let color = 'orange-500';
    const indexValue = parseFloat(crimeIndex);
    if (indexValue < 4) {
        level = 'Low';
        color = 'green-500';
    } else if (indexValue > 8) {
        level = 'High';
        color = 'red-500';
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="text-2xl font-bold text-gray-900">{latestTotalCrimes}</div>
                <div className="text-sm text-gray-500">Total Crimes ({new Date(latestQuarter).toLocaleString(
                    'default', { month: 'long', year: 'numeric' })} to {new Date(new Date(latestQuarter)
                    .setMonth(new Date(latestQuarter).getMonth() + 2)).toLocaleString('default',
                    { month: 'long', year: 'numeric' })})</div>
                <div className={`text-xs mt-1 ${Number(percentageChange) > 0 ? 'text-red-500' : 'text-green-500'}`}>
                    {Number(percentageChange) > 0 ? '↑' : '↓'} {Math.abs(Number(percentageChange))}% from previous quarter
                </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="text-2xl font-bold text-blue-600">{stations}</div>
                <div className="text-sm text-gray-500">Police Stations</div>
                <div className="text-xs text-green-500 mt-1">Well covered</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 relative group">
                <div className="text-2xl font-bold text-{color}">{crimeIndex}</div>
                <div className="text-sm text-gray-500">Crime Index</div>
                <div className={`text-xs text-${color} mt-1`}>{level}</div>
                <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block
                bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap z-10">
                    Crimes per 100,000 population, scaled to 1-12 based on a max of 6,000/100k quarterly.
                    Uses district population if available.
                </span>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 relative group">
                <div className="text-2xl font-bold text-green-600">{safetyScore}%</div>
                <div className="text-sm text-gray-500">Safety Score</div>
                <div className={`text-xs ${parseInt(safetyScore) > 70 ? 'text-green-500' : parseInt(safetyScore) < 40 ? 
                    'text-red-500' : 'text-orange-500'} mt-1`}>
                    {parseInt(safetyScore) > 70 ? 'Above average' : parseInt(safetyScore) < 40 ? 'Below average' : 'Moderate'}
                </div>
                <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block
                bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap z-10">
                    Calculated as 100 - ((Crime Index - 1) * 100 / 11), reflecting safety based on quarterly crime rate.
                </span>
            </div>
        </div>
    );
}