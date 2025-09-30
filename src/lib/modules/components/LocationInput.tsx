import { useState, useEffect } from 'react';
import { MapPin, CheckCheck, Ban } from 'lucide-react';

interface LocationInputProps {
    location: string;
    setCoords?: (lat: number, lon: number) => void;
    useCurrentLocation: boolean;
    setLocation: (location: string) => void;
    setUseCurrentLocation: (useCurrentLocation: boolean) => void;
}

export default function LocationInput({ location, setCoords, useCurrentLocation, setLocation, setUseCurrentLocation }: LocationInputProps) {
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (useCurrentLocation) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const { latitude, longitude } = position.coords;
                        if (setCoords){
                            setCoords(latitude, longitude);
                        }
                        try {
                            const response = await fetch(
                                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
                                {
                                    headers: {
                                        'User-Agent': 'Crimap/1.0 (maseemet0@gmail.com)',
                                    },
                                }
                            );
                            const data = await response.json();
                            if (data && data.display_name) {
                                setLocation(data.display_name);
                            } else {
                                setLocation(`${latitude}, ${longitude}`);
                            }
                        } catch (err) {
                            setError('Failed to fetch address. Using coordinates instead.');
                            setLocation(`${latitude}, ${longitude}`);
                        }
                    },
                    (err) => {
                        setError('Unable to retrieve your location.');
                        setUseCurrentLocation(false);
                    }
                );
            } else {
                setError('Geolocation is not supported by this browser.');
                setUseCurrentLocation(false);
            }
        }
    }, [useCurrentLocation, setLocation, setUseCurrentLocation]);

    const handleToggle = () => {
        setUseCurrentLocation(!useCurrentLocation);
        if (!useCurrentLocation) {
            setLocation('');
        }
    };

    return (
        <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
            <div className="space-y-3">
                <label
                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg text-left
                      text-gray-700 flex items-center justify-between hover:cursor-pointer
                      ${useCurrentLocation && 'border-[#8F9C68]'} `}
                >
                    <div className="flex items-center">
                        <MapPin size={16} className="mr-4" />
                        <span className="font-medium">Use current location</span>
                    </div>
                    {useCurrentLocation ? <CheckCheck size={16} className="text-[#8F9C68]"/> : <Ban size={16} />}
                    <input
                        type="checkbox"
                        checked={useCurrentLocation}
                        onChange={handleToggle}
                        className="hidden"
                    />
                </label>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter address, intersection, or landmark"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg
                    focus:border-transparent"
                    disabled={useCurrentLocation}
                />
            </div>
        </div>
    );
}