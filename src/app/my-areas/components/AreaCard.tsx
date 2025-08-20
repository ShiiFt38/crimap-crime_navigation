//TODO: Add color bottom border under buttons

import RiskBadge from "@/app/my-areas/components/RiskBadge";
import CrimeItem from "@/app/my-areas/components/CrimeItem";

interface AreaCardProps {
    area: string;
    distance: number;
    crimeIndex: number;
}
export default function AreaCard({area, distance, crimeIndex}: AreaCardProps) {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden area-card">
            <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">{area}</h2>
                        <p className="text-sm text-gray-500">{distance} kilometres away</p>
                    </div>
                    <RiskBadge crimeIndex={crimeIndex}/>
                </div>

                <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Recent Crimes</h3>
                    {/*Crime list*/}
                    <div className="space-y-2">
                        <CrimeItem crime="Theft" timestamp="Yesterday, 2:30 PM" />
                        <CrimeItem crime="Vandalism" timestamp="2 days ago, 11:15 PM" />
                        <CrimeItem crime="Public Disturbance" timestamp="1 days ago, 11:15 PM" />
                    </div>

                    <div className="flex space-x-2 mt-4">
                        <button className="flex-1 bg-[#B05216] active:bg-[#4F2915] cursor-pointer border-b-2
                        border-[#4F2915] text-white py-2 px-3 rounded-lg text-sm font-medium">
                            Get Updates
                        </button>
                        <button className="flex-1 bg-gray-100 active:bg-[#4F2915] cursor-pointer border-b-2
                        border-[#4F2915] active:text-white text-gray-700 py-2 px-3 rounded-lg text-sm font-medium">
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}