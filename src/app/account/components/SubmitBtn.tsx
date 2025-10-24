export default function SubmitBtn({ name }: { name: string }){
    return (
        <input
            type="submit"
            value={name}
            className="bg-[var(--color-secondary)] active:bg-[var(--color-quarternary)] text-white px-10 py-2 rounded-lg
                    flex cursor-pointer border-b-2 border-[var(--color-quarternary)] items-center shadow-md text-sm"
        />
    )
}