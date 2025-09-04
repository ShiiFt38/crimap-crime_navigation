//TODO: Turn the elements into controlled components
'use client'

import { Phone, CirclePlus, Trash } from "lucide-react"
import { useState } from "react";
import SubmitBtn from "@/app/account/components/SubmitBtn";

export default function EmergencyContactsForm() {
    const [emergencyData, setEmergencyData] = useState({
        contactName: "",
        phoneNumber: "",
        dependent: "Family",
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(emergencyData)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement
        | HTMLSelectElement>) => {
        const {name, value} = e.target
        setEmergencyData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }))
    }

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 lg:col-span-2">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Emergency Contacts</h3>
                    <div className="py-[0.25rem] px-[0.75rem] bg-green-100 rounded-lg flex items-center justify-center mr-4">
                        <Phone size={16} className="text-green-600" />
                    </div>
                </div>

            <form id="contactsList" className="space-y-4 md:px-16" onSubmit={handleSubmit}>

                {/*Add emergency contact*/}
                <div
                    className="flex flex-col md:flex-row sm:items-center justify-between p-4
                    bg-gray-50 rounded-lg border">


                        <div className="flex flex-col md:flex-row sm:space-x-4">
                            <input type="text" placeholder="Contact Name"
                                   name="contactName"
                                   onChange={handleChange}
                                   value={emergencyData.contactName}
                                   className="mb-2 sm:mb-0 px-3 py-2 border border-gray-300 rounded-md"/>
                            <input type="tel" placeholder="(555)-478-5678"
                                   onChange={handleChange}
                                   name="phoneNumber"
                                   value={emergencyData.phoneNumber}
                                   className="mb-2 sm:mb-0 px-3 py-2 border border-gray-300 rounded-md"/>
                            <select
                                onChange={handleChange}
                                name="dependent"
                                value={emergencyData.dependent}
                                className="px-3 py-2 border border-gray-300 mx-4 rounded-md">
                                <option value="family">Family</option>
                                <option value="friend">Friend</option>
                                <option value="colleague">Colleague</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    <button
                        className="p-2 rounded-full cursor-pointer active:text-[#4F2915]">
                        <CirclePlus size={16} />
                    </button>
                </div>
                <SubmitBtn name={"Save Emergency Contacts"}/>
            </form>
        </div>
    )
}