{/*
This component shows a summary of crime statistics for the district.
It runs on the server and uses crime data passed to it. Here's how it works:

1. Take the list of crime records (rows) as input, an array of objects like:
   - { count: number, district_name?: string, station_name?: string, date: string }[].
2. Group the total number of crimes by their dates (quarters) using a reduce function, creating a Record<string, number>
   - (e.g., { "2019-04-01": 150, "2019-01-01": 130 }) where keys are dates and values are total counts.
3. Sort the quarter dates (string[]) descending to find the latest and previous quarters.
4. Calculate:
   - Total crimes for the latest quarter (number) from the record.
   - Total crimes for the previous quarter (number) from the record.
   - Percentage change (number) between the two quarters (how much it went up or down).
   - Count unique police stations (number) from the station_name array using a Set.
   - Calculate a crime index (number) based on the latest quarter's total (scaled to 0-10 range).
   - Decide if the crime level is 'Low', 'Moderate', or 'High' (string) based on the index.
5. Display four statistic boxes:
   - First box: Show latest quarter's total crimes and percentage change with color (red for up, green for down).
   - Second box: Show the number of police stations.
   - Third box: Show the crime index with its level and matching color.
   - Fourth box: Show a fixed safety score (for now, can be dynamic later).
This helps users quickly see the latest crime trends for the district using processed data.
*/}

type StatsSummaryProps = {
    rows: { count: number; district_name?: string; station_name?: string; date: string; population: number | null }[];
};

export default function StatsSummary({ rows }: StatsSummaryProps) {
    // Group total crimes by quarter (date)
    const quarters = rows.reduce((acc, row) => {
        if (!acc[row.date]) acc[row.date] = 0;
        acc[row.date] += row.count;
        return acc;
    }, {} as Record<string, number>);

    // Sort dates descending
    const sortedDates = Object.keys(quarters).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

    const latestQuarter = sortedDates[0] || '';
    const previousQuarter = sortedDates[1] || '';

    const latestTotalCrimes = quarters[latestQuarter] || 0;
    const previousTotalCrimes = quarters[previousQuarter] || 0;

    const percentageChange = previousTotalCrimes > 0
        ? ((latestTotalCrimes - previousTotalCrimes) / previousTotalCrimes * 100).toFixed(0)
        : 0;

    const stations = new Set(rows.map((row) => row.station_name)).size; // Unique stations

    // Calculate average population for fallback (exclude nulls)
    const validPopulations = rows.map(row => row.population).filter(p => p !== null) as number[];
    const avgPopulation = validPopulations.length > 0 ? validPopulations.reduce((a, b) => a + b) / validPopulations.length : 10000;
    const population = rows[0]?.population ?? avgPopulation; // Use district population or average

    // Calculate crime index (crimes per 100,000, scaled to 1-12 based on max expected 1200/100k annually)
    const crimeRatePer100k = (latestTotalCrimes / population) * 100000;
    const maxExpectedRate = 1200; // Assume 1200 crimes/100k annually (100/100k quarterly as max)
    const crimeIndex = Math.max(1, Math.min(12, (crimeRatePer100k / (maxExpectedRate / 12)) + 1)).toFixed(1);

    // Calculate safety score (inversely related, 0-100%)
    const safetyScore = Math.max(0, Math.min(100, 100 - ((parseFloat(crimeIndex) - 1) * 100 / 11))).toFixed(0);

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
                <div className="text-sm text-gray-500">Total Crimes (Latest Quarter)</div>
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
                bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap z-9">
                    Crimes per 100,000 population, scaled to 1-12 based on a max of 1200/100k annually. Uses average population if null.
                </span>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 relative group">
                <div className="text-2xl font-bold text-green-600">{safetyScore}%</div>
                <div className="text-sm text-gray-500">Safety Score</div>
                <div className={`text-xs ${parseInt(safetyScore) > 70 ? 'text-green-500' : parseInt(safetyScore) < 40 ? 'text-red-500' : 'text-orange-500'} mt-1`}>
                    {parseInt(safetyScore) > 70 ? 'Above average' : parseInt(safetyScore) < 40 ? 'Below average' : 'Moderate'}
                </div>
                <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block
                bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap z-9">
                    Calculated as 100 - ((Crime Index - 1) * 100 / 11), reflecting safety based on crime rate.
                </span>
            </div>
        </div>
    );
}