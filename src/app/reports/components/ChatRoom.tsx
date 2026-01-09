interface Comment {
    comment_id: number;
    comment_text: string;
    timestamp: string;
    author: string;
}

type ChatRoomProps = {
    show: boolean,
    comments: Comment[],
    loadingComments: boolean,
    session: any,
    newComment: string,
    onChange: (e: any) => void,
    submitComment: () => void,
}

export default function ChatRoom({show, comments, loadingComments, session, newComment, onChange, submitComment}:
    ChatRoomProps) {
    return (
        <div className={`border-t border-gray-200 ${!show && "hidden"} pt-3 mt-3`}>
            <div className="bg-gray-50 rounded-lg p-3 mb-3 max-h-48 overflow-y-auto space-y-2">
                {loadingComments ? <p>Loading...</p> : comments.map(c => (
                    <div key={c.comment_id} className="flex items-start space-x-2">
                        <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white
                        text-xs font-bold">{c.author[0].toUpperCase()}</div>
                        <div className="flex-1">
                            <div className="bg-white rounded-lg p-2 shadow-sm">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs font-medium text-gray-700">{c.author}</span>
                                    <span className="text-xs text-gray-500">{new Date(c.timestamp).toLocaleString()}</span>
                                </div>
                                <p className="text-sm text-gray-800">{c.comment_text}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {session ? (
                <div className="flex space-x-2">
                    <input
                        type="text"
                        value={newComment}
                        placeholder="Add to discussion..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        onChange={onChange}/>
                    <button
                        type="submit"
                        onClick={submitComment}
                        className="bg-[var(--color-secondary)] active:bg-[var(--color-quarternary)]
                    cursor-pointer border-b-2 border-[var(--color-quarternary)] text-white px-4 py-2 rounded-lg
                    text-sm font-medium transition-colors">
                        Send
                    </button>
                </div>
            ) : (<p className="text-sm text-gray-600">Log in to comment</p>
            )}
        </div>
    )
}