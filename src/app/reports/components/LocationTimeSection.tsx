import { MapPin } from "lucide-react";
import LocationInput from "@/lib/modules/components/LocationInput";

interface LocationTimeSectionProps {
    useCurrentLocation: boolean;
    location: string;
    date: string;
    time: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setLocation: (location: string) => void;
    setUseCurrentLocation: (useCurrentLocation: boolean) => void;
}

export default function LocationTimeSection({ useCurrentLocation, location, date, time, onChange, setLocation, setUseCurrentLocation }: LocationTimeSectionProps) {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Location & Time</h3>
                <div className="py-[0.25rem] px-[0.75rem] bg-gray-200 rounded-lg flex items-center justify-center mr-4">
                    <MapPin size={16} className="text-gray-600 text-xl" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:px-20">
                <LocationInput
                    location={location}
                    useCurrentLocation={useCurrentLocation}
                    setLocation={setLocation}
                    setUseCurrentLocation={setUseCurrentLocation}
                />

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                    <input
                        type="date"
                        name="date"
                        onChange={onChange}
                        value={date}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time *</label>
                    <input
                        type="time"
                        name="time"
                        onChange={onChange}
                        value={time}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                </div>
            </div>
        </div>
    );
}