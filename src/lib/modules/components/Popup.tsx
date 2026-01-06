interface PopupState {
    onClose: () => void;
    text: string,
}

export default function Popup({onClose, text}: PopupState) {
    return (
        <div className="fixed bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-gray-200
        m-auto z-90 rounded-lg shadow-sm p-[20px]">
            <div className="text-center">
                <p>{text}</p>
                <button
                    className="bg-[var(--color-secondary)] active:bg-[var(--color-quarternary)] text-white
                                px-10 py-2 mt-8 rounded-lg flex cursor-pointer border-b-2 border-[var(--color-quarternary)]
                                items-center shadow-md text-sm mx-auto"
                        onClick={onClose}>Close
                </button>
            </div>
        </div>
    )
}