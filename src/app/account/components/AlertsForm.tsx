'use client'

import { Bell } from "lucide-react";
import { useState } from "react";
import SubmitBtn from "@/app/account/components/SubmitBtn";

export default function AlertsForm() {
    const [ alertsData, setAlertsData ] = useState({
        smsAlerts: false,
        emailAlerts: false,
        pushNotifications: false,
        alertRadius: "",
    })

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(alertsData)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setAlertsData((prevState) => ({
            ...prevState,
            [name]: type === "checkbox" ? checked : value,
        }))
    }

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Real-time Alerts</h3>
                <div className="py-[0.25rem] px-[0.75rem] bg-yellow-200 rounded-lg flex items-center justify-center mr-4">
                    <Bell size={16} className="yellow-600 text-xl" />
                </div>
            </div>

            <form onSubmit={onSubmit} className="flex flex-col space-y-6 md:px-16">
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
                            peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full
                            peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px]
                            after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full
                            after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
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
                            peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full
                            peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px]
                            after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full
                            after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
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
                            peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full
                            peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px]
                            after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full
                            after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                </div>

                <div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>1 mile</span>
                        <span>{alertsData.alertRadius || "1"} miles</span>
                        <span>10 miles</span>
                    </div>
                    <input type="range" name="alertRadius" min="1" max="10" value={alertsData.alertRadius} onChange={handleChange}
                           className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"/>
                </div>

                <SubmitBtn name={"Save Alert Preferences"}/>
            </form>
        </div>
    )
}