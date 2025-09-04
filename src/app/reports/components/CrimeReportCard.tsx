'use client'

import { MapPin, EllipsisVertical, ThumbsUp, Pin } from "lucide-react";
import Image from "next/image"; // Correct import for Next.js Image
import OffenceBadge from "@/app/reports/components/OffenceBadge";
import { useState } from "react";

interface ReportCardProps {
    offence: string;
    time: string;
    description: string;
    location: string;
    author: string;
    likes: number;
    image?: string;
}

export default function CrimeReportCard({
                                            offence,
                                            time,
                                            description,
                                            location,
                                            author,
                                            likes,
                                            image,
                                        }: ReportCardProps) {
    const [isDetailsOpen, setIsDetailsOpen] = useState(false); // State for toggling details

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 w-full">
            {/* Post details and menu button */}
            <div className="flex flex-row items-start justify-between mb-3">
                <div className="flex flex-row items-center space-x-2 w-3/4">
                    <OffenceBadge offence={offence} />
                    <span className="text-gray-500 text-xs whitespace-nowrap">{time}</span>
                </div>
                <button
                    className="group p-2 cursor-pointer hover:bg-gray-100 rounded-full w-1/4 max-w-fit justify-self-end"
                    onClick={() => setIsDetailsOpen(!isDetailsOpen)}
                >
                    <EllipsisVertical size={18} className="justify-self-end group-active:text-[#4F2915]" />
                </button>
            </div>

            {/* Toggleable full details list */}
            {isDetailsOpen && (
                <div className="bg-gray-50 rounded-lg p-3 mb-3 text-sm text-gray-700">
                    <p><strong>Offence:</strong> {offence}</p>
                    <p><strong>Time:</strong> {time}</p>
                    <p><strong>Description:</strong> {description}</p>
                    <p><strong>Location:</strong> {location}</p>
                    <p><strong>Author:</strong> {author}</p>
                    <p><strong>Likes:</strong> {likes}</p>
                </div>
            )}

            <p className="text-gray-800 text-sm mb-3">{description}</p>

            {image && (
                <div className="relative bg-gray-200 rounded-lg h-32 mb-3 overflow-hidden">
                    <img
                        src={image}
                        alt="Report image"
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </div>
            )}

            <div className="bg-gray-100 rounded-lg p-3 mb-3 w-full">
                <div className="flex items-center text-gray-600 text-xs">
                    <MapPin size={14} className="mr-2" /> {location}
                </div>
            </div>

            <div className="flex items-center justify-between">
                <span className="text-gray-500 text-xs">by {author}</span>
                <div className="flex items-center space-x-4 bg-[#B05216] rounded-full px-4 py-2">
                    <button className="cursor-pointer flex items-center space-x-1 text-white hover:text-safety-blue">
                        <ThumbsUp size={14} />
                        <span className="text-xs">{likes}</span>
                    </button>
                    <button className="cursor-pointer text-white hover:text-safety-blue">
                        <Pin size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
}