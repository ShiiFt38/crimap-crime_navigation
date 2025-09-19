//TODO: Add the logic for the "Add contact" button, create a form for adding a contact
//TODO: implement the update button functionality

'use client'

import { House } from "lucide-react"
import { useState } from "react";
import SubmitBtn from "@/app/account/components/SubmitBtn";

export default function LocationForm(){
    const [locationData, setlocationData] = useState({
        address: "",
        currentLocation: false,
    })

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(locationData);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, type, checked, value } = e.target
        setlocationData((prevState) => ({
            ...prevState,
            [name]: type === "checkbox" ? checked : value,
        }))
    }

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Default Location</h3>
                <div className="py-[0.25rem] px-[0.75rem] bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                    <House size={16} className="text-purple-600 text-xl"/>
                </div>
            </div>

            <form onSubmit={onSubmit} className="flex flex-col space-y-4 md:px-16">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Home Address</label>
                    <input type="text" name="address" placeholder="123 Main Street, New York, NY 10001"
                           onChange={handleChange} value={locationData.address}
                           className="w-full px-4 py-3 border border-gray-300 rounded-lg"/>
                </div>
                <div className="flex items-center space-x-3">
                    <input type="checkbox" name="currentLocation" id="useCurrentLocation" onChange={handleChange}
                           checked={locationData.currentLocation}
                           className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"/>
                    <label htmlFor="useCurrentLocation" className="text-sm text-gray-700">Use current location
                        as default</label>
                </div>
                <SubmitBtn name={"Update Location"}/>
            </form>
        </div>
    )
}