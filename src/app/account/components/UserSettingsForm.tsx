//TODO: validate phone number input suing za format only

'use client'

import {LoaderCircle, User} from "lucide-react"
import { useState, useEffect } from "react"
import SubmitBtn from "@/app/account/components/SubmitBtn";
import {useSession} from "next-auth/react";
import FormError from "@/lib/modules/components/FormError";
import FormSuccess from "@/lib/modules/components/FormSuccess";

export default function UserSettingsForm() {
    const { data: session, status} = useSession()
    const [userData, setUserData] = useState({
        username: "",
        fullName: "",
        phoneNumber: "",
    })

    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        if(status == "authenticated" && session?.user) {
            setUserData(prevUserData => ({
                ...prevUserData,
                username: session.user.name || "",
                fullName: session.user.fullName || "",
                phoneNumber: session.user.phone,
            }))
        }
    }, [session, status]);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null)
        setSuccess(null)
        setLoading(true)
        console.log(userData)

        if (!userData.username || !userData.fullName || !userData.phoneNumber) {
            setError("All fields are required.")
            setLoading(false)
            return
        }

        try {
            const response = await fetch("/api/account/update-user", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(userData),
            })

            const res = await response.json()
            if (!response.ok) {
                setError(res.error || "An unexpected error occurred. Please try again later.")
                setLoading(false)
                return
            }

            setSuccess("Profile updated successfully.")
            setLoading(false)
        } catch (error) {
            setError(error.message || "An error occurred while updating the profile.")
            setLoading(false)
        }
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
                    {loading ? <LoaderCircle  size={16} className="animate-spin"/>
                        : <User size={16} className="text-blue-600" />}
                </div>
            </div>

            <form className="group flex flex-col space-y-4 md:px-16" onSubmit={onSubmit}>
                {error && <FormError text={error} />}
                {success && <FormSuccess text={success} />}

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                    <input id="username" type="text" name="username" placeholder="username"
                           autoComplete="off" onChange={handleChange} value={userData.username}
                           required
                           className="w-full px-4 py-3 border border-gray-300 rounded-lg"/>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input type="text" name="fullName" placeholder="Full Name"
                           autoComplete="off" onChange={handleChange} value={userData.fullName}
                           className="w-full px-4 py-3 border border-gray-300 rounded-lg"/>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input type="tel" name="phoneNumber" placeholder="Phone Number" autoComplete="off"
                           onChange={handleChange} value={userData.phoneNumber} required
                           className="w-full px-4 py-3 border border-gray-300 rounded-lg"/>
                </div>
                <SubmitBtn name={"Update Profile"}/>
            </form>
        </div>
    )
}