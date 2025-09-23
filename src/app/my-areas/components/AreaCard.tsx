import Link from "next/link";
import { useState } from "react";
import slugify from "slugify";
import RiskBadge from "./RiskBadge";
import CrimeItem from "./CrimeItem";
import { LoaderCircle } from "lucide-react";

interface AreaCardProps {
    area: string;
    distance: number;
    crimeIndex: string;
}

export default function AreaCard({ area, distance, crimeIndex }: AreaCardProps) {
    const [isLoading, setIsLoading] = useState(false);

    const handleViewAreaClick = () => {
        setIsLoading(true);
        console.log("Crime index: ", crimeIndex)
        // The navigation will handle the loading state via Next.js loading.tsx
        // Reset loading state could be managed by a callback, but we'll let the page handle it
    };

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden snap-start transition-all duration-200 hover:shadow-lg">
            <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">{area.replace("District", "").trim()}</h2>
                        <p className="text-sm text-gray-500">{distance} kilometres away</p>
                    </div>
                    <RiskBadge crimeIndex={crimeIndex} />
                </div>

                <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Recent Crimes</h3>
                    {/* Crime list - using dynamic data would be ideal, but using static for now */}
                    <div className="space-y-2">
                        <CrimeItem crime="Robbery at residential premises" timestamp="April 2019" />
                        <CrimeItem crime="Truck Hijacking" timestamp="June 2019" />
                        <CrimeItem crime="Malicious damage to property" timestamp="July 2019" />
                    </div>

                    <div className="flex space-x-2 mt-4">
                        <Link
                            href={`/my-areas/${slugify(area, { lower: true })}`}
                            onClick={handleViewAreaClick}
                            className={`flex-1 bg-[#B05216] active:bg-[#4F2915] cursor-pointer border-b-2
                        border-[#4F2915] text-white py-2 px-3 rounded-lg text-sm font-medium text-center ${
                                isLoading ? "opacity-50 cursor-not-allowed" : "active:bg-[#4F2915]"
                            }`}
                            aria-disabled={isLoading}
                        >
                            {isLoading ? <LoaderCircle size={16} className="m-auto animate-spin"/> : "View Area"}
                        </Link>
                        <button
                            className="flex-1 bg-gray-100 active:bg-[#4F2915] cursor-pointer border-b-2
                        border-[#4F2915] active:text-white text-gray-700 py-2 px-3 rounded-lg text-sm font-medium"
                            disabled={isLoading}
                        >
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}