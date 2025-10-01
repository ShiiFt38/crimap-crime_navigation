'use client'

import {Phone, Share2, TriangleAlert} from "lucide-react";

export default function Emergency() {
    return (
        <main className="flex-grow bg-gray-100 min-h-100vh">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/*Emergency Action*/}
            <div className="lg:col-span-2 mt-8 bg-gradient-to-r from-red-500 to-red-600 rounded-xl shadow-lg p-6 text-white">
                <div className="flex items-center mb-4">
                    <TriangleAlert className="text-2xl mr-3" />
                    <h3 className="text-lg font-semibold">Emergency Actions</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                        className="flex flex-row justify-center bg-red-400 bg-opacity-20 hover:bg-opacity-30
                        backdrop-blur-sm border border-white border-opacity-30
                        text-white font-medium py-3 px-4 rounded-lg transition-all">
                        <Phone className="mr-2"/>Call 10111
                    </button>
                    <button
                        className="flex flex-row justify-center bg-red-400 bg-opacity-20 hover:bg-opacity-30
                        backdrop-blur-sm border border-white border-opacity-30
                        text-white font-medium py-3 px-4 rounded-lg transition-all">
                        <Share2 className="mr-2"/>Share Location
                    </button>
                </div>
            </div>
                </div>
        </main>
    );
}