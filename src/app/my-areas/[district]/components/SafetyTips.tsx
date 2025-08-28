{/*
This component shows safety tips tailored to the district.
It runs on the server and uses the district name as input. Here's how it works:

1. Take the district name as input (string), though tips are static for now.
2. Prepare a list of three safety tips (array of strings) like "Avoid walking alone after 10 PM".
3. For each tip:
   - Add a checkmark icon to make it clear it’s advice.
   - Display the tip text in a styled list.
4. Show the list inside a gradient background box with a title "Safety Tips for This Area".
This helps users stay safe by providing general advice for the district using a fixed string array.
*/}

type SafetyTipsProps = {
    district: string;
};

export default function SafetyTips({ district }: SafetyTipsProps) {
    return (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Safety Tips for This Area</h3>
            <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start space-x-2">
                    <svg className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <span>Avoid walking alone after 10 PM, especially near Main St</span>
                </li>
                <li className="flex items-start space-x-2">
                    <svg className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <span>Keep valuables secure in crowded areas like Central Plaza</span>
                </li>
                <li className="flex items-start space-x-2">
                    <svg className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <span>Police station is 2 blocks away on Oak Street</span>
                </li>
            </ul>
        </div>
    );
}