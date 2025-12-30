// app/reports/components/CrimeReportCard.tsx
'use client'

import { MapPin, EllipsisVertical, ThumbsUp, Pin, MessageCircleMore } from "lucide-react";
import OffenceBadge from "@/app/reports/components/OffenceBadge";
import { useState } from "react";
import ChatRoom from "@/app/reports/components/ChatRoom";
import {useSession} from "next-auth/react";

interface MediaItem {
    path: string;
    type: "image" | "video" | "audio";
}

interface ReportCardProps {
    offence: string;
    time: string;
    description: string;
    location: string;
    author: string;
    likes: number;
    reportId: number;
    media?: MediaItem[]; // Now receives array from API
}

export default function CrimeReportCard({
                                            offence,
                                            time,
                                            description,
                                            location,
                                            author,
                                            likes,
                                            reportId,
                                            media = [],
                                        }: ReportCardProps) {
    const { data: session, status } = useSession();
    const [ currentLikes, setCurrentLikes ] = useState(likes);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [chatRoom, setChatRoom] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentMedia, setCurrentMedia] = useState<MediaItem | null>(null);

    const handleUpvote = async () => {
        if (!session) {
            alert("Please log in to upvote");
            return;
        }

        try {
            const response = await fetch("/api/reports/upvote", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ reportId }),
            });

            if (response.ok) {
                setCurrentLikes(currentLikes + 1);
            } else {
                alert("Failed to upvote");
            }
        } catch (error) {
            alert("Network error");
        }
    };

    const openModal = (item: MediaItem) => {
        setCurrentMedia(item);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setCurrentMedia(null);
    };

    if (!session) {
        const handleUpvote = () => alert("Please log in to upvote")
    }

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:px-20 w-full">
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
                    <EllipsisVertical size={18} className="justify-self-end group-active:text-[var(--color-quarternary)]" />
                </button>
            </div>

            {/* Toggleable full details list */}
            {isDetailsOpen && (
                <div className="bg-gray-50 rounded-lg p-3 mb-3 text-sm text-gray-700 border border-gray-300">
                    <p><strong>Offence:</strong> {offence}</p>
                    <p><strong>Time:</strong> {time}</p>
                    <p><strong>Description:</strong> {description}</p>
                    <p><strong>Location:</strong> {location}</p>
                    <p><strong>Author:</strong> {author}</p>
                    <p><strong>Likes:</strong> {likes}</p>
                </div>
            )}

            <p className="text-gray-800 text-sm mb-3">{description}</p>

            {/* Media Grid - Now handles multiple files */}
            {media.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-5">
                    {media.map((item, index) => (
                        <div
                            key={index}
                            className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 cursor-pointer
                            hover:opacity-90 transition-opacity"
                            onClick={() => openModal(item)}
                        >
                            {item.type === "image" && (
                                <img
                                    src={item.path}
                                    alt={`Evidence ${index + 1}`}
                                    className="w-full h-full object-cover m-auto"
                                    onError={(e) => {
                                        e.currentTarget.src = "/images/broken-image.png";
                                    }}
                                />
                            )}
                            {item.type === "video" && (
                                <div className="w-full h-full bg-black flex items-center justify-center">
                                    <video className="w-full h-full object-cover">
                                        <source src={item.path} />
                                    </video>
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <div className="bg-white bg-opacity-80 rounded-full p-3">
                                            <svg width="32" height="32" viewBox="0 0 24 24" fill="#B05216">
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {item.type === "audio" && (
                                <div className="w-full h-full flex flex-col items-center justify-center bg-gray-200">
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" className="text-gray-600 mb-2">
                                        <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                                        <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
                                    </svg>
                                    <span className="text-xs text-gray-600">Audio File</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Location */}
            <div className="bg-gray-100 rounded-lg p-3 mb-3 w-fit border border-gray-300">
                <div className="flex items-center text-gray-600 text-xs">
                    <MapPin size={14} className="mr-2" />
                    {location}
                </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between">
                <span className="text-gray-500 text-xs">by {author}</span>
                <div className="flex items-center space-x-4 bg-[var(--color-secondary)] rounded-full px-4 py-2 border-b-2 border-[var(--color-quarternary)]">
                    <button onClick={handleUpvote} className="cursor-pointer flex items-center space-x-1 text-white">
                        <ThumbsUp size={14} />
                        <span className="text-xs">{likes}</span>
                    </button>
                    <button className="cursor-pointer text-white">
                        <Pin size={14} />
                    </button>
                    <button className="cursor-pointer text-white" onClick={() => setChatRoom(!chatRoom)}>
                        <MessageCircleMore size={14} />
                    </button>
                </div>
            </div>

            <ChatRoom show={chatRoom} />

            {/* Full-Screen Modal */}
            {modalOpen && currentMedia && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
                    onClick={closeModal}
                >
                    <div className="relative max-w-4xl max-h-full">
                        {currentMedia.type === "image" && (
                            <img
                                src={currentMedia.path}
                                alt="Full size evidence"
                                className="max-w-full max-h-full object-contain"
                                onError={(e) => {
                                    e.currentTarget.src = "/images/broken-image.png";
                                }}
                            />
                        )}
                        {currentMedia.type === "video" && (
                            <video controls autoPlay className="max-w-full max-h-full">
                                <source src={currentMedia.path} />
                                Your browser does not support the video tag.
                            </video>
                        )}
                        {currentMedia.type === "audio" && (
                            <div className="bg-gray-900 p-10 rounded-lg">
                                <audio controls autoPlay className="w-full">
                                    <source src={currentMedia.path} />
                                    Your browser does not support audio.
                                </audio>
                            </div>
                        )}
                        <button
                            className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full
                            cursor-pointer p-2"
                            onClick={closeModal}
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}