'use client'

import { Lock } from "lucide-react"
import { useState } from "react";
import SubmitBtn from "@/app/account/components/SubmitBtn";

export default function PasswordForm() {
    const [ passwordData, setPasswordData ] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    })

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(passwordData)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setPasswordData((prevState) => ({
            ...prevState,
            [name]: value }))
    }

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Change Password</h3>
                <div className="py-[0.25rem] px-[0.75rem] bg-red-100 rounded-lg flex items-center justify-center mr-4">
                    <Lock size={16} className="text-red-600 text-xl" />
                </div>
            </div>

            <form className="space-y-4" onSubmit={onSubmit}>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                    <input type="password" name="currentPassword" onChange={handleChange} value={passwordData.currentPassword}
                           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"/>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                    <input type="password" name="newPassword" onChange={handleChange} value={passwordData.newPassword}
                           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"/>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                    <input type="password" name="confirmPassword" onChange={handleChange} value={passwordData.confirmPassword}
                           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"/>
                </div>
                <SubmitBtn name={"Update Password"}/>
            </form>
        </div>
    )
}