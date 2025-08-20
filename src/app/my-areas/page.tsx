//TODO: Add a placeholder container for when there is no saved areas

import {Plus} from "lucide-react";
import AreaCard from "@/app/my-areas/components/AreaCard"

export default function MyAreas() {
    return (
        <main className="flex-grow bg-gray-100">
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    <AreaCard area="Downtown" distance={1.2} crimeIndex={3}/>
                    <AreaCard area="Riverside Park" distance={2.6} crimeIndex={6}/>
                    <AreaCard area="Central Station" distance={3.2} crimeIndex={2}/>
                    <AreaCard area="Shopping Mall" distance={4.3} crimeIndex={10}/>
                </div>

            </div>
        </main>
    )
}