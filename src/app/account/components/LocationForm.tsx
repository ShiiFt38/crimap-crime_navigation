//TODO: implement the update button functionality

'use client'

import { House, LoaderCircle } from "lucide-react"
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import LocationInput from "@/lib/modules/components/LocationInput";
import SubmitBtn from "@/app/account/components/SubmitBtn";

export default function LocationForm(){
    const { data: session, status} = useSession()
    const [locationData, setLocationData] = useState({
        address: "",
        currentLocation: false,
        latitude: 0,
        longitude: 0,
    })

    useEffect(() => {
        if(status == "authenticated" && session?.user) {
            setLocationData(prevUserData => ({
                ...prevUserData,
                address: session.user.address || "",
                latitude: session.user.latitude || 0,
                longitude: session.user.longitude || 0,
            }))
        }
    }, [session, status]);

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const errorMessages = {
        MISSING_LOCATION: "Location is required when not using current location.",
        SERVER_ERROR: "An unexpected error occurred. Please try again later.",
        UNAUTHORIZED: "Unauthorized access. Please sign in again.",
        default: "An error occurred while updating the location.",
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setLoading(true);

        if (!locationData.currentLocation && !locationData.address.trim()) {
            setError(errorMessages.MISSING_LOCATION);
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("/api/account/update-location", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    address: locationData.address,
                    useCurrentLocation: locationData.currentLocation,
                    latitude: locationData.currentLocation ? locationData.latitude : null,
                    longitude: locationData.currentLocation ? locationData.longitude : null,
                }),
            });

            const res = await response.json();
            if (!response.ok) {
                setError(errorMessages[res.error] || errorMessages.default);
                setLoading(false);
                return;
            }

            setSuccess("Location updated successfully!");
            setLoading(false);
        } catch (err) {
            setError(err.message || errorMessages.SERVER_ERROR);
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Default Location</h3>
                <div className="py-[0.25rem] px-[0.75rem] bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                    {loading ? <LoaderCircle  size={16} className="animate-spin"/>
                        : <House size={16} className="text-purple-600 text-xl" />}
                </div>
            </div>

            <form onSubmit={onSubmit} className="flex flex-col space-y-4 md:px-16">
                {error && (
                    <p className="text-red-500 mb-4 text-sm bg-red-50 p-3 rounded border border-red-200">
                        {error}
                    </p>
                )}
                {success && (
                    <p className="text-green-500 mb-4 text-sm bg-green-50 p-3 rounded border border-green-200">
                        {success}
                    </p>
                )}
                <LocationInput
                    location={locationData.address}
                    setCoords={(lat, lon) =>
                        setLocationData((prev) => ({ ...prev, latitude: lat, longitude: lon }))
                    }
                    useCurrentLocation={locationData.currentLocation}
                    setLocation={(value) =>
                        setLocationData((prev) => ({ ...prev, address: value }))
                    }
                    setUseCurrentLocation={(value) =>
                        setLocationData((prev) => ({ ...prev, currentLocation: value }))
                    }
                />
                <SubmitBtn name={"Update Location"}/>
            </form>
        </div>
    )
}