"use client";
{/*
This component shows a static map section for the district's crime overview.
It runs in the browser (client-side) and works like this:

1. When the component loads, print a message to check if it’s working (placeholder for future map setup).
2. Create a colored background with a grid pattern using SVG lines to look like a map base.
3. Add control buttons on the top right (zoom in and out) that change appearance when hovered over.
4. Place a safety level indicator on the bottom left showing "Moderate Risk" with a colored dot.
5. The map is static for now, but it’s ready to add real map features (like Leaflet) later.
This component doesn’t need data from the database; it just displays a visual placeholder using basic HTML and CSS.
*/}

import { useEffect } from "react";

export default function Map() {
    useEffect(() => {
        // Placeholder for map initialization (e.g., Leaflet or Google Maps)
        console.log("Map component mounted");
    }, []);

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
            <div className="absolute bottom-4 left-4 rounded-lg p-3 shadow-lg backdrop-blur-lg">
                <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-gradient-to-br from-[#f59e0b] to-[#fbbf24] rounded-full" />
                    <span className="text-sm font-medium text-gray-700">Moderate Risk</span>
                </div>
            </div>
        </div>
    );
}