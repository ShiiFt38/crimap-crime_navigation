export default function SubmitBtn({ name }: { name: string }){
    return (
        <input
            type="submit"
            value={name}
            className="px-10 bg-[#B05216] active:bg-[#4F2915] border-b-2 border-[#4F2915] text-white
                text-sm py-2 rounded-lg cursor-pointer justify-self-center"
        />
    )
}