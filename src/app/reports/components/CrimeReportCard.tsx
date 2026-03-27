'use client'

import { MapPin, EllipsisVertical, ThumbsUp, MessageCircleMore } from "lucide-react";
import OffenceBadge from "@/app/reports/components/OffenceBadge";
import { useState, useEffect } from "react";
import ChatRoom from "@/app/reports/components/ChatRoom";
import { useSession } from "next-auth/react";

interface Comment {
    commentId: number;
    commentText: string;
    timestamp: string;
    author: string | null;
}

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
    media?: MediaItem[];
}

export default function CrimeReportCard({
    offence,
    time,
    description,
    location,
    author,
    likes: initialLikes,
    reportId,
    media = [],
}: ReportCardProps) {
    const { data: session } = useSession();
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [chatRoomOpen, setChatRoomOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentMedia, setCurrentMedia] = useState<MediaItem | null>(null);
    const [likes, setLikes] = useState(initialLikes);
    const [hasUpvoted, setHasUpvoted] = useState(false);
    const [upvoteLoading, setUpvoteLoading] = useState(false);
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState("");
    const [loadingComments, setLoadingComments] = useState<boolean>(false);

    const fetchComments = async () => {
        setLoadingComments(true);
        try {
            const res = await fetch(`/api/reports/comments?reportId=${reportId}`);
            if (res.ok) {
                const data = await res.json();
                setComments(data);
            }
        } catch {
            console.error("Failed to load comments");
        } finally {
            setLoadingComments(false);
        }
    };

    useEffect(() => {
        void fetchComments();
    }, [chatRoomOpen, reportId]);

    useEffect(() => {
        if (!session?.user?.id) return;

        const checkUpvoteStatus = async () => {
            try {
                const res = await fetch(`/api/reports/upvote-status?reportId=${reportId}`, {
                    headers: { "Content-Type": "application/json" },
                });
                if (res.ok) {
                    const { hasUpvoted } = await res.json();
                    setHasUpvoted(hasUpvoted);
                }
            } catch (err) {
                console.error("Failed to check upvote status", err);
            }
        };

        void checkUpvoteStatus();
    }, [session, reportId]);

    const submitComment = async () => {
        if (!newComment.trim()) return;
        if (!session) {
            alert("Please log in to comment");
            return;
        }

        try {
            const res = await fetch("/api/reports/comments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ reportId, comment: newComment }),
            });

            if (res.ok) {
                setNewComment("");
                await fetchComments();
            } else {
                alert("Failed to post comment");
            }
        } catch {
            alert("Network error");
        }
    };

    const toggleUpvote = async () => {
        if (!session) {
            alert("Please log in to upvote");
            return;
        }
        if (upvoteLoading) return;

        setUpvoteLoading(true);
        try {
            const response = await fetch("/api/reports/upvote", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ reportId }),
            });

            const result = await response.json();

            if (response.ok) {
                setLikes(result.upvotes);
                setHasUpvoted(result.hasUpvoted);
            } else {
                alert(result.error || "Failed to toggle upvote");
            }
        } catch {
            alert("Network error");
        } finally {
            setUpvoteLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:px-20 w-full">
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

            {media.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-5">
                    {media.map((item, index) => (
                        <div
                            key={index}
                            className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() => {
                                setCurrentMedia(item);
                                setModalOpen(true);
                            }}
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
                                </div>
                            )}
                            {item.type === "audio" && (
                                <div className="w-full h-full flex flex-col items-center justify-center bg-gray-200">
                                    <span className="text-xs text-gray-600">Audio File</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            <div className="bg-gray-100 rounded-lg p-3 mb-3 w-fit border border-gray-300">
                <div className="flex items-center text-gray-600 text-xs">
                    <MapPin size={14} className="mr-2" />
                    {location}
                </div>
            </div>

            <div className="flex items-center justify-between">
                <span className="text-gray-500 text-xs">by {author}</span>
                <div className="flex items-center space-x-4 bg-[var(--color-secondary)] rounded-full px-4 py-2 border-b-2 border-[var(--color-quarternary)] align-middle">
                    <button onClick={toggleUpvote} disabled={upvoteLoading} className="cursor-pointer flex items-center space-x-1 text-white">
                        <ThumbsUp size={14} fill={hasUpvoted ? "white" : "none"} />
                        <span className="text-xs">{likes}</span>
                    </button>
                    <button className="flex space-x-1 cursor-pointer text-white" onClick={() => setChatRoomOpen(!chatRoomOpen)}>
                        <MessageCircleMore size={14} />
                        <span className="text-xs">{comments.length}</span>
                    </button>
                </div>
            </div>

            <ChatRoom
                show={chatRoomOpen}
                comments={comments}
                loadingComments={loadingComments}
                session={session}
                newComment={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                submitComment={submitComment}
            />

            {modalOpen && currentMedia && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
                    onClick={() => {
                        setModalOpen(false);
                        setCurrentMedia(null);
                    }}
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
                            className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full cursor-pointer p-2"
                            onClick={() => {
                                setModalOpen(false);
                                setCurrentMedia(null);
                            }}
                        >
                            X
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
