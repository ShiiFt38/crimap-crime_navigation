'use client'

import { Bell, LoaderCircle } from "lucide-react";
import { useState, useEffect } from "react";
import SubmitBtn from "@/app/account/components/SubmitBtn";
import {useSession} from "next-auth/react";
import FormError from "@/lib/modules/components/FormError";
import FormSuccess from "@/lib/modules/components/FormSuccess";


export default function AlertsForm() {
    const { data: session, status } = useSession();
    const [ alertsData, setAlertsData ] = useState({
        smsAlerts: false,
        emailAlerts: false,
        pushNotifications: false,
    });

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const errorMessages = {
        INVALID_INPUT: "Invalid alert preferences provided.",
        Unauthorized: "You must be logged in to update the preferences.",
        default: "An unexpected error occurred. Please try again later",
    }

    // Fetch alert preferences on mount
    useEffect(() => {
        if (status === "authenticated" && session?.user) {
            const fetchAlerts = async () => {
                try {
                    const response = await fetch("/api/account/get-alerts", {
                        method: "GET",
                        headers: { "Content-Type": "application/json" },
                    });

                    if (!response.ok) {
                        const res = await response.json();
                        setError(res.error || errorMessages.default);
                        return;
                    }

                    const data = await response.json();
                    setAlertsData({
                        smsAlerts: data.smsAlerts,
                        emailAlerts: data.emailAlerts,
                        pushNotifications: data.pushNotifications,
                    });
                } catch (error) {
                    setError(error instanceof Error ? error.message : errorMessages.default);
                }
            };

            fetchAlerts();
        }
    }, [session, status]);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setLoading(true);
        console.log(alertsData)

        try {
            const response = await fetch("/api/account/update-alerts", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(alertsData),
            });

            const res = await response.json();
            if (!response.ok) {
                setError(errorMessages[res.error] || errorMessages.default)
                setLoading(false)
                return;
            }

            setSuccess("Alert preferences updated successfully.");
            setLoading(false);
        } catch (error) {
            setError(error instanceof Error ? error.message : errorMessages.default);
            setLoading(false);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, type, checked } = e.target;
        setAlertsData((prevState) => ({
            ...prevState,
            [name]: type === "checkbox" ? checked : false,
        }))
    }

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Real-time Alerts</h3>
                <div className="py-[0.25rem] px-[0.75rem] bg-yellow-200 rounded-lg flex items-center justify-center mr-4">
                    {loading ? <LoaderCircle className="animate-spin" size={16}/>
                        : <Bell size={16} className="text-yellow-600 text-xl" />}
                </div>
            </div>

            <form onSubmit={onSubmit} className="flex flex-col space-y-6 md:px-16">
                {error && <FormError text={error} />}
                {success && <FormSuccess text={success} />}
                <div className="flex items-center justify-between">
                    <div>
                        <h4 className="font-medium text-gray-900">SMS Alerts</h4>
                        <p className="text-sm text-gray-600">Receive crime alerts via text message</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" name="smsAlerts" className="sr-only peer" onChange={handleChange}
                            checked={alertsData.smsAlerts}/>
                        <div
                            className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4
                            peer-focus:ring-[var(--color-tertiary)] rounded-full peer peer-checked:after:translate-x-full
                            peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px]
                            after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full
                            after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-primary)]"></div>
                    </label>
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <h4 className="font-medium text-gray-900">Email Alerts</h4>
                        <p className="text-sm text-gray-600">Receive detailed crime reports via email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" name="emailAlerts" checked={alertsData.emailAlerts} className="sr-only peer"
                            onChange={handleChange}/>
                        <div
                            className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4
                            peer-focus:ring-[var(--color-tertiary)] rounded-full peer peer-checked:after:translate-x-full
                            peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px]
                            after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full
                            after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-primary)]"></div>
                    </label>
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <h4 className="font-medium text-gray-900">Push Notifications</h4>
                        <p className="text-sm text-gray-600">Instant alerts on your device</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" name="pushNotifications" className="sr-only peer" onChange={handleChange}
                        checked={alertsData.pushNotifications}/>
                        <div
                            className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4
                            peer-focus:ring-[var(--color-tertiary)] rounded-full peer peer-checked:after:translate-x-full
                            peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px]
                            after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full
                            after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-primary)]"></div>
                    </label>
                </div>

                <SubmitBtn name={"Save Alert Preferences"}/>
            </form>
        </div>
    )
}
