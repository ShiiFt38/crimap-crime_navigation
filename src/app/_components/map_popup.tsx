interface MapPopupProps {
    district_name: string
}

export default function MapPopup({district_name} :MapPopupProps) {
    return (
        <div className="bg-white shadow-2xl w-full relative items-center text-center">
            <div className="bg-[#1E4B26] text-white p-5 relative">
                <h2 className="text-2xl font-bold m-0 mb-2">{district_name}</h2>
                <p className="text-sm opacity-90 m-0">Metropolitan District</p>
            </div>

            <div className="p-6">

                <div className="flex flex-col gap-y-2">
                    <button
                        className="bg-[#B05216] active:bg-[#4F2915] text-white px-10 py-2 rounded-lg flex
                        cursor-pointer border-b-2 border-[#4F2915] text-center shadow-md text-sm">
                        <span className="m-auto">Save Area</span>
                    </button>
                    <button
                        className="bg-[#B05216] active:bg-[#4F2915] text-white px-10 py-2 rounded-lg flex
                        cursor-pointer border-b-2 border-[#4F2915] text-center shadow-md text-sm"
                    ><span className="m-auto">View Details</span>
                    </button>
                    <button
                        className="bg-[#B05216] active:bg-[#4F2915] text-white px-10 py-2 rounded-lg flex
                        cursor-pointer border-b-2 border-[#4F2915] text-center shadow-md text-sm"
                    ><span className="m-auto">Set Alert</span>
                    </button>
                </div>
            </div>
        </div>
    )
}