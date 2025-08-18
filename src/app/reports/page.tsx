// TODO: Change crime indicators to match styling in My areas page
// TODO: Create components for submitted chats

import { MapPin, EllipsisVertical } from "lucide-react";

export default function Reports(){
    return (
        <div id="reportsContent" className="max-w-md mx-auto px-4 py-4 space-y-4 md:max-w-4xl">

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                        <span
                            className="bg-safety-red text-white text-xs font-medium px-2 py-1 rounded-full">Theft</span>
                        <span className="text-gray-500 text-xs">2 hours ago</span>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                        <EllipsisVertical />
                    </button>
                </div>

                <p className="text-gray-800 text-sm mb-3">Bike stolen from outside Central Station. Black mountain bike,
                    locked with chain lock that was cut.</p>

                <div className="bg-gray-100 rounded-lg p-3 mb-3">
                    <div className="flex items-center text-gray-600 text-xs">
                        <MapPin />
                        Central Station, Main St
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-xs">by @anonymous</span>
                    <div className="flex items-center space-x-4">
                        <button className="flex items-center space-x-1 text-gray-500 hover:text-safety-blue">
                            <span>👍</span>
                            <span className="text-xs">12</span>
                        </button>
                        <button className="text-gray-500 hover:text-safety-blue">
                            <span>📌</span>
                        </button>
                        <button className="text-gray-500 hover:text-safety-blue">
                            <span>🔗</span>
                        </button>
                    </div>
                </div>
            </div>


            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                        <span
                            className="bg-safety-orange text-white text-xs font-medium px-2 py-1 rounded-full">Assault</span>
                        <span className="text-gray-500 text-xs">5 hours ago</span>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                        <EllipsisVertical />
                    </button>
                </div>

                <p className="text-gray-800 text-sm mb-3">Witnessed verbal altercation that escalated to pushing. Police
                    were called and arrived quickly.</p>

                <div className="bg-gray-100 rounded-lg p-3 mb-3">
                    <div className="flex items-center text-gray-600 text-xs">
                        <MapPin /> Park Avenue & 5th Street
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-xs">by @safetywatch</span>
                    <div className="flex items-center space-x-4">
                        <button className="flex items-center space-x-1 text-gray-500 hover:text-safety-blue">
                            <span>👍</span>
                            <span className="text-xs">8</span>
                        </button>
                        <button className="text-gray-500 hover:text-safety-blue">
                            <span>📌</span>
                        </button>
                        <button className="text-gray-500 hover:text-safety-blue">
                            <span>🔗</span>
                        </button>
                    </div>
                </div>
            </div>


            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                        <span
                            className="bg-yellow-500 text-white text-xs font-medium px-2 py-1 rounded-full">Vandalism</span>
                        <span className="text-gray-500 text-xs">1 day ago</span>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                        <EllipsisVertical />
                    </button>
                </div>

                <p className="text-gray-800 text-sm mb-3">Graffiti on bus stop shelter. Appears to be gang-related tags.
                    City has been notified for cleanup.</p>

                {/*media thumbnail*/}
                <div className="bg-gray-200 rounded-lg h-32 mb-3 flex items-center justify-center">
                    <span className="w-8 h-8 text-gray-400"></span>
                </div>

                <div className="bg-gray-100 rounded-lg p-3 mb-3">
                    <div className="flex items-center text-gray-600 text-xs">
                        <MapPin /> Oak Street Bus Stop
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-xs">by @concerned_citizen</span>
                    <div className="flex items-center space-x-4">
                        <button className="flex items-center space-x-1 text-gray-500 hover:text-safety-blue">
                            <span>👍</span>
                            <span className="text-xs">15</span>
                        </button>
                        <button className="text-gray-500 hover:text-safety-blue">
                            <span>📌</span>
                        </button>
                        <button className="text-gray-500 hover:text-safety-blue">
                            <span>🔗</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}