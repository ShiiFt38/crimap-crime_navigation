'use client'

import { User } from "lucide-react"
import { useState } from "react"
import SubmitBtn from "@/app/account/components/SubmitBtn";

export default function UserSettingsForm() {
    const [userData, setUserData] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
    })

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(userData)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData(prevFormData => ({
            ...prevFormData,
            [name]:value
        }))
    }

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">User Settings</h3>
                <div className="py-[0.25rem] px-[0.75rem] bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <User size={16} className="text-blue-600" />
                </div>
            </div>

            <form className="space-y-4" onSubmit={onSubmit}>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input type="text" name="fullName" placeholder="Full Name"
                           autoComplete="off" onChange={handleChange} value={userData.fullName}
                           className="w-full px-4 py-3 border border-gray-300 rounded-lg"/>
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input id="email" type="email" name="email" placeholder="Email Address"
                           autoComplete="off" onChange={handleChange} value={userData.email}
                           className="w-full px-4 py-3 border border-gray-300 rounded-lg"/>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input type="tel" name="phoneNumber" placeholder="Phone Number" autoComplete="off"
                           onChange={handleChange} value={userData.phoneNumber}
                           className="w-full px-4 py-3 border border-gray-300 rounded-lg"/>
                </div>
                <SubmitBtn name={"Update Profile"}/>
            </form>
        </div>
    )
}