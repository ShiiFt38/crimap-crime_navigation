import { Phone, Plus, Trash } from "lucide-react"

export default function EmergencyContactsForm() {
    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                    <div className="py-[0.25rem] px-[0.75rem] bg-green-100 rounded-lg flex items-center justify-center mr-4">
                        <Phone size={16} className="text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Emergency Contacts</h3>
                </div>
                <button id="addContactBtn"
                        className="flex flex-row bg-[#B05216] hover:bg-[#4F2915] text-white font-medium py-2 px-4 rounded-lg transition-colors">
                    <Plus className="mr-2" />Add Contact
                </button>
            </div>

            <div id="contactsList" className="space-y-4">
                {/*Emergency Contact 1*/}
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

                {/*Emergency Contact 2*/}
                <div
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg border">
                    <div className="flex-1 mb-3 sm:mb-0">
                        <div className="flex flex-col sm:flex-row sm:space-x-4">
                            <input type="text" placeholder="Contact Name" defaultValue="Mike Davis"
                                   className="mb-2 sm:mb-0 px-3 py-2 border border-gray-300 rounded-md focus:ring-2
                                   focus:ring-blue-500 focus:border-transparent"/>
                            <input type="tel" placeholder="Phone Number" defaultValue="+1 (555) 456-7890"
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
            </div>

            <button
                className="w-full mt-4 bg-[#B05216] hover:bg-[#4F2915] text-white font-medium py-3 px-4 rounded-lg transition-colors">
                Save Emergency Contacts
            </button>
        </div>
    )
}