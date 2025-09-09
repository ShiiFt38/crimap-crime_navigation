// app/my-areas/[district]/loading.tsx (new file for loading effect)
export default function Loading() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#B05216]"></div>
                <p className="mt-4 text-gray-600">Loading district data...</p>
            </div>
        </div>
    );
}