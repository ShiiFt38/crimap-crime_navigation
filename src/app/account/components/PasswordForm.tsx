//TODO: implement the update button functionality

'use client'

import {LoaderCircle, Lock} from "lucide-react"
import { useState } from "react";
import SubmitBtn from "@/app/account/components/SubmitBtn";
import FormError from "@/lib/modules/components/FormError";

export default function PasswordForm() {
    const [ passwordData, setPasswordData ] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const errorMessages = {
        PASSWORD_MISMATCH: "New passwords do not match",
        MISSING_CREDENTIALS: "All fields are required.",
        PASSWORD_INCORRECT: "Current password is incorrect",
        default: "An unexpected error occurred. Please try again later."
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError(null);
        setSuccess(null);
        setLoading(true)
        console.log(passwordData)

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setError(errorMessages.PASSWORD_MISMATCH);
            setLoading(false)
            return;
        }

        if (!passwordData.currentPassword || !passwordData.newPassword) {
            setError(errorMessages.MISSING_CREDENTIALS);
            setLoading(false)
            return;
        }

        try {
            const response = await fetch("/api/account/update-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(passwordData),
            });

            const res = await response.json();
            if (!response.ok) {
                setError(errorMessages[res.error] || errorMessages.default);
                setLoading(false)
                return;
            }

            setSuccess("Password updated successfully!");
            setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
            setLoading(false)
        } catch (err) {
            setError(err.message || "An error occurred while updating the password.");
            setLoading(false)
        }
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
                    {loading ? <LoaderCircle  size={16} className="animate-spin"/>
                        : <Lock size={16} className="text-red-600 text-xl" />}
                </div>
            </div>

            <form className="group flex flex-col space-y-4 md:px-16" onSubmit={onSubmit}>
                {error && <FormError text={error} />}
                {success && <p className="text-green-500 mb-4 text-sm bg-green-50 p-3 rounded border border-green-200">{success}</p>}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Password *</label>
                    <input type="password" name="currentPassword" onChange={handleChange} value={passwordData.currentPassword}
                           required
                           className="w-full px-4 py-3 border border-gray-300 rounded-lg transition-all"/>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">New Password *</label>
                    <input type="password" name="newPassword" onChange={handleChange} value={passwordData.newPassword}
                           required
                           className="w-full px-4 py-3 border border-gray-300 rounded-lg transition-all"/>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password *</label>
                    <input type="password" name="confirmPassword" onChange={handleChange} value={passwordData.confirmPassword}
                           required
                           className="w-full px-4 py-3 border border-gray-300 rounded-lg transition-all"/>
                </div>
                <SubmitBtn name={"Update Password"}/>
            </form>
        </div>
    )
}