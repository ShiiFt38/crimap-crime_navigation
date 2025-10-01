//TODO: Add focus rings on form inputs for real time form verification
//TODO: Add a confirmation popup for form submissions
"use client"


import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import UserSettingsForm from "@/app/account/components/UserSettingsForm";
import PasswordForm from "@/app/account/components/PasswordForm";
import EmergencyContactsForm from "@/app/account/components/EmergencyContactsForm";
import LocationForm from "@/app/account/components/LocationForm";
import AlertsForm from "@/app/account/components/AlertsForm";
import {TriangleAlert, Phone, Share2, LogOut, LoaderCircle} from "lucide-react"

export default function Settings() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/auth/signin");  // Redirect to sign-in
        }
    }, [status, router]);

    const handleLogout = async () => {
        await signOut({ callbackUrl: "/auth/signin" }); // Redirect to sign-in after logout
    };

    if (status === "loading") {
        return <div className="flex justify-center items-center h-64">
            <LoaderCircle className="animate-spin"/>
        </div>;
    }

    if (!session) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <button onClick={() => signIn()} className="bg-[#B05216] active:bg-[#4F2915]
                text-white px-10 py-2 rounded-lg flex cursor-pointer border-b-2 border-[#4F2915] items-center
                shadow-md text-sm">
                    Sign In to Access Settings
                </button>
            </div>
        );
    }

    return (
        <main className="flex-grow bg-gray-100 min-h-[100vh] pb-14">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
                <p className="text-gray-600">Manage your personal safety preferences and account details</p>
            </div>
            {/*max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6*/}
            {/*Settings Grid*/}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-1 lg:grid-cols-2 gap-6">
                {/*User Settings Card*/}
                <UserSettingsForm />

                {/*Change Password Card*/}
                <PasswordForm />

                {/*Emergency Contacts Card*/}
                <EmergencyContactsForm />

                {/*Default Location Card*/}
                <LocationForm />

                <AlertsForm />

                {/* New Logout Button */}
                <div className="lg:col-span-2 mt-4 flex justify-center">
                    <button
                        onClick={handleLogout}
                        className="bg-[#B05216] active:bg-[#4F2915] text-white px-10 py-2 rounded-lg flex
                            cursor-pointer border-b-2 border-[#4F2915] items-center shadow-md text-sm"
                    >
                        <LogOut className="mr-2" />
                        Log Out
                    </button>
                </div>
            </div>
        </main>
    )
}