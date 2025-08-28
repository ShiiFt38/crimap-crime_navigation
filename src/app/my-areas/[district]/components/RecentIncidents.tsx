{/*
This component lists the most recent crime incidents for the district.
It runs on the server and uses crime data passed to it. Here's how it works:

1. Take the list of crime records (rows) and the district name as input, where rows are an array of objects like:
   - { offence_name: string, date: string, station_name?: string, district?: string }[].
2. Sort the records by date, newest first, and take the top 3 as a subset array.
3. For each incident:
   - Show the offence name and location (use station name or district if station is missing).
   - Show the date in a readable format (e.g., "2 days ago" or full date) from the string.
   - Color-code the background based on order (red for first, orange for third).
4. Display the list inside a styled box with a title "Recent Incidents".
This gives users a quick look at the latest crime events in the district using sorted data.
*/}

type RecentIncidentsProps = {
    rows: { offence_name: string; date: string; station_name?: string; district?: string }[];
    district: string;
};

export default function RecentIncidents({ rows, district }: RecentIncidentsProps) {
    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Incidents</h3>
            <div className="space-y-3">
                {rows.map((row, index) => (
                    <div
                        key={index}
                        className={`flex items-center justify-between p-3 rounded-lg ${
                            index === 0 ? "bg-red-50" : index === 1 ? "bg-red-50" : "bg-orange-50"
                        }`}
                    >
                        <div className="flex items-center space-x-3">
                            <div
                                className={`w-2 h-2 rounded-full ${
                                    index === 0 ? "bg-red-500" : index === 1 ? "bg-red-600" : "bg-orange-500"
                                }`}
                            />
                            <div>
                                <div className="font-medium text-gray-900">{row.offence_name}</div>
                                <div className="text-sm text-gray-500">{row.station_name || district}</div>
                            </div>
                        </div>
                        <div className="text-sm text-gray-500">
                            {new Date(row.date).toLocaleDateString("en-US", { day: "numeric", month: "long" })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}