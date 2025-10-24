export default function ChatRoom({show}: {show: boolean}) {
    return (
        <div className={`border-t border-gray-200 ${!show && "hidden"} pt-3 mt-3`}>
            <div className="bg-gray-50 rounded-lg p-3 mb-3 max-h-48 overflow-y-auto space-y-2">
                <div className="flex items-start space-x-2">
                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">M</div>
                    <div className="flex-1">
                        <div className="bg-white rounded-lg p-2 shadow-sm">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-xs font-medium text-gray-700">@mayor_office</span>
                                <span className="text-xs text-gray-500">18h ago</span>
                            </div>
                            <p className="text-sm text-gray-800">Thank you for the report. Cleanup crew has been dispatched and will address this today.</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-start space-x-2">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">L</div>
                    <div className="flex-1">
                        <div className="bg-white rounded-lg p-2 shadow-sm">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-xs font-medium text-gray-700">@local_resident</span>
                                <span className="text-xs text-gray-500">12h ago</span>
                            </div>
                            <p className="text-sm text-gray-800">I've seen the same tags appearing around the neighborhood. Should we organize a community watch?</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-start space-x-2">
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">C</div>
                    <div className="flex-1">
                        <div className="bg-white rounded-lg p-2 shadow-sm">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-xs font-medium text-gray-700">@concerned_citizen</span>
                                <span className="text-xs text-gray-500">8h ago</span>
                            </div>
                            <p className="text-sm text-gray-800">Great idea! I'm in for a community watch group. Let's coordinate.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex space-x-2">
                <input type="text" placeholder="Add to discussion..." className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"/>
                    <button className="bg-[var(--color-secondary)] active:bg-[var(--color-quarternary)]
                    cursor-pointer border-b-2 border-[var(--color-quarternary)] text-white px-4 py-2 rounded-lg
                    text-sm font-medium transition-colors">
                        Send
                    </button>
            </div>
        </div>
    )
}