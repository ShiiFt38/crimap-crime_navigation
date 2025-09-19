// app/my-areas/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { Plus } from "lucide-react";
import AreaCard from "@/app/my-areas/components/AreaCard"

export default function MyAreas() {
    const [districts, setDistricts] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state for initial fetch

    useEffect(() => {
        const fetchDistricts = async () => {
            setLoading(true);
            try {
                const res = await fetch('/api/districts');
                const data = await res.json();
                setDistricts(data);
            } catch (error) {
                console.error("Error fetching districts:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDistricts();
    }, []);

    return (
        <main className="flex-grow min-h-[100vh] bg-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">My Areas</h1>
                    <button className="bg-[#B05216] active:bg-[#4F2915] text-white px-10 py-2 rounded-lg flex
                        cursor-pointer border-b-2 border-[#4F2915] items-center shadow-md text-sm">
                        <Plus />
                        Add Area
                    </button>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <p className="text-lg text-gray-600">Loading...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-14">
                        {districts.map((district) => (
                            <AreaCard
                                key={district.id}
                                area={district.district_name}
                                distance={1.2}
                                crimeIndex={district.crimeIndex}
                            />
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}