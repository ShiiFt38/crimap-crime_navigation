import { House } from "lucide-react"

export default function LocationForm(){
    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold  text-gray-900">Default Location</h3>
                <div className="py-[0.25rem] px-[0.75rem] bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                    <House size={16} className="text-purple-600 text-xl"/>
                </div>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Home Address</label>
                    <input type="text" value="123 Main Street, New York, NY 10001"
                           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"/>
                </div>
                <div className="flex items-center space-x-3">
                    <input type="checkbox" id="useCurrentLocation"
                           className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"/>
                    <label htmlFor="useCurrentLocation" className="text-sm text-gray-700">Use current location
                        as default</label>
                </div>
                <button
                    className="w-full bg-[#B05216] hover:bg-[#4F2915] text-white font-medium py-3 px-4 rounded-lg transition-colors">
                    <i className="fas fa-crosshairs mr-2"></i>Update Location
                </button>
            </div>
        </div>
    )
}