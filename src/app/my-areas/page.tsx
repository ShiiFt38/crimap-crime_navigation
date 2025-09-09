//TODO: Calculate the crime index to display on the area card badges
//TODO: Add a loading effect
'use client'

import { useState, useEffect } from 'react'
import {Plus} from "lucide-react";
import AreaCard from "@/app/my-areas/components/AreaCard"

export default function MyAreas() {
    const [districts, setDistricts] = useState([]);

    useEffect(() => {
        fetch("/api/districts")
            .then(res => res.json())
            .then(data => setDistricts(data));
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

                {/*Area cards*/}
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
            </div>
        </main>
    )
}