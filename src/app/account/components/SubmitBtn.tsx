export default function SubmitBtn({ name }: { name: string }){
    return (
        <input
            type="submit"
            value={name}
            className="bg-[#B05216] active:bg-[#4F2915] text-white px-10 py-2 rounded-lg
                    flex cursor-pointer border-b-2 border-[#4F2915] items-center shadow-md text-sm"
        />
    )
}