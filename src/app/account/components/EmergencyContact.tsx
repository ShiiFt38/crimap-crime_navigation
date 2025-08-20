//TODO: Turn this component to a reusable module, props...

import {Trash} from "lucide-react";

export default function EmergencyContact() {
    return (
        <div
            className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg border">
            <div className="flex-1 mb-3 sm:mb-0">
                <div className="flex flex-col sm:flex-row sm:space-x-4">
                    <input type="text" placeholder="Contact Name" defaultValue="Sarah Johnson"
                           className="mb-2 sm:mb-0 px-3 py-2 border border-gray-300 rounded-md focus:ring-2
                                   focus:ring-blue-500 focus:border-transparent"/>
                    <input type="tel" placeholder="Phone Number" defaultValue="+1 (555) 987-6543"
                           className="mb-2 sm:mb-0 px-3 py-2 border border-gray-300 rounded-md focus:ring-2
                                   focus:ring-blue-500 focus:border-transparent"/>
                    <select
                        className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2
                                focus:ring-blue-500 focus:border-transparent">
                        <option value="family">Family</option>
                        <option value="friend">Friend</option>
                        <option value="colleague">Colleague</option>
                        <option value="other">Other</option>
                    </select>
                </div>
            </div>
            <button
                className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-200 transition-colors">
                <Trash size={16} className="text-red" />
            </button>
        </div>
    )
}