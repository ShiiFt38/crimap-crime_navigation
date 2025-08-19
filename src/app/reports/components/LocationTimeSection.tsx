import {Check, MapPin, Ban } from "lucide-react";

interface LocationTimeSectionProps {
    useCurrentLocation: boolean;
    location: string;
    date: string;
    time: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function LocationTimeSection({ useCurrentLocation, location, date, time, onChange }: LocationTimeSectionProps){
    return(
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    Location & Time
                </h2>
                <div className="py-[0.25rem] px-[0.75rem] bg-gray-200 rounded-lg flex items-center
                           justify-center mr-4">
                    <MapPin size={16} className="text-gray-600"/>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                    <div className="space-y-3">
                        <label
                            className={`w-full px-4 py-3 border border-gray-300 rounded-lg text-left
                                        text-gray-700 flex items-center justify-between hover:cursor-pointer
                                        ${useCurrentLocation && "bg-blue-50"} border-safety-blue`}
                        >
                            <div className="flex items-center">
                                <MapPin size={16} className="mr-4" />
                                <span className="font-medium text-safety-blue">Use current location</span>
                            </div>

                            {useCurrentLocation ? <Check size={16}/> : <Ban size={16}/>}

                            {/* visually hidden checkbox drives the state */}
                            <input
                                type="checkbox"
                                name="useCurrentLocation"
                                checked={useCurrentLocation}
                                onChange={onChange}
                                className="hidden"
                            />
                        </label>

                        <div className="text-center text-gray-500 text-sm">or</div>
                        <input
                            type="text"
                            name="location"
                            onChange={onChange}
                            value={location}
                            placeholder="Enter address, intersection, or landmark"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2
                                    focus:ring-safety-blue focus:border-transparent"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                    <input
                        type="date"
                        name="date"
                        onChange={onChange}
                        value={date}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2
                                focus:ring-safety-blue focus:border-transparent"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time *</label>
                    <input
                        type="time"
                        name="time"
                        onChange={onChange}
                        value={time}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2
                                focus:ring-safety-blue focus:border-transparent"
                    />
                </div>
            </div>
        </div>
    )
}