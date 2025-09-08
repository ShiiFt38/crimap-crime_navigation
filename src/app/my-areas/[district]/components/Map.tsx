"use client";

import { useEffect } from "react";

export default function Map() {
    {/*
        useEffect(() => {
            // Placeholder for map initialization (e.g., Leaflet or Google Maps)
            console.log("Map component mounted");
        }, []);
    */}

    return (
        <div className="h-64 md:h-80 relative bg-gradient-to-br from-[#667eea] to-[#764ba2] overflow-hidden">
            <div className="absolute inset-0 opacity-20">
                <svg className="w-full h-full" viewBox="0 0 400 300">
                    <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" opacity="0.3" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                    <line x1="0" y1="100" x2="400" y2="100" stroke="white" strokeWidth="3" opacity="0.5" />
                    <line x1="0" y1="200" x2="400" y2="200" stroke="white" strokeWidth="3" opacity="0.5" />
                    <line x1="150" y1="0" x2="150" y2="300" stroke="white" strokeWidth="3" opacity="0.5" />
                    <line x1="250" y1="0" x2="250" y2="300" stroke="white" strokeWidth="3" opacity="0.5" />
                </svg>
            </div>
            <div className="absolute top-4 right-4 flex flex-col space-y-2">
                <button className="bg-white p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                </button>
                <button className="bg-white p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 12H6" />
                    </svg>
                </button>
            </div>
            <div className="absolute bottom-4 left-4 rounded-lg p-3 shadow-lg backdrop-blur-lg group">
                <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-gradient-to-br from-[#f59e0b] to-[#fbbf24] rounded-full" />
                    <span className="text-sm font-medium text-gray-700 duration-300">Moderate Risk</span>
                </div>
                <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block
                bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap z-9">
          Based on crime index (0-10 scale), where Moderate is 4-7. Reflects total crimes in the latest quarter.
        </span>
            </div>
        </div>
    );
}