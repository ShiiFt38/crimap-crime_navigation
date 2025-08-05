import { Bell } from "lucide-react";

export default function AlertsForm() {
    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Real-time Alerts</h3>
                <div className="py-[0.25rem] px-[0.75rem] bg-yellow-200 rounded-lg flex items-center justify-center mr-4">
                    <Bell size={16} className="yellow-600 text-xl" />
                </div>
            </div>

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h4 className="font-medium text-gray-900">SMS Alerts</h4>
                        <p className="text-sm text-gray-600">Receive crime alerts via text message</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer"/>
                        <div
                            className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <h4 className="font-medium text-gray-900">Email Alerts</h4>
                        <p className="text-sm text-gray-600">Receive detailed crime reports via email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked className="sr-only peer"/>
                        <div
                            className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <h4 className="font-medium text-gray-900">Push Notifications</h4>
                        <p className="text-sm text-gray-600">Instant alerts on your device</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer"/>
                        <div
                            className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Alert Radius (miles)</label>
                    <input type="range" min="1" max="10" value="3"
                           className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"/>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>1 mile</span>
                        <span id="radiusValue">3 miles</span>
                        <span>10 miles</span>
                    </div>
                </div>

                <button
                    className="w-full bg-[#B05216] hover:bg-[#4F2915] text-white font-medium py-3 px-4 rounded-lg transition-colors">
                    Save Alert Preferences
                </button>
            </div>
        </div>
    )
}