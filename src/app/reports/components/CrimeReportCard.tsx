import { MapPin, EllipsisVertical, ThumbsUp, Pin } from "lucide-react";
import OffenceBadge from "@/app/reports/components/OffenceBadge";
import Image from "next/link";

interface ReportCardProps {
    offence : string,
    time : string,
    description : string,
    location : string,
    author : string,
    likes : number,
    image? : string,
}

export default function CrimeReportCard({offence, time, description, location, author, likes, image,
                                        } :ReportCardProps) {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                    <OffenceBadge offence={offence} />
                    <span className="text-gray-500 text-xs">{time}</span>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                    <EllipsisVertical />
                </button>
            </div>

            <p className="text-gray-800 text-sm mb-3">{description}</p>

            {image && (
                <div className="image bg-gray-200 rounded-lg h-32 mb-3 flex items-center justify-center">
                    <Image
                        src={image}
                        alt="Crime report media"
                        width={300}
                        height={128}
                        className="object-cover w-full h-32"
                    />
                </div>
            )}

            <div className="bg-gray-100 rounded-lg p-3 mb-3">
                <div className="flex items-center text-gray-600 text-xs">
                    <MapPin size={14} className="mr-4"/> {location}
                </div>
            </div>

            <div className="flex items-center justify-between">
                <span className="text-gray-500 text-xs">by {author}</span>
                <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-safety-blue">
                        <ThumbsUp size={12}/>
                        <span className="text-xs">{likes}</span>
                    </button>
                    <button className="text-gray-500 hover:text-safety-blue">
                        <Pin />
                    </button>
                    <button className="text-gray-500 hover:text-safety-blue">
                        <span>🔗</span>
                    </button>
                </div>
            </div>
        </div>
    );
}