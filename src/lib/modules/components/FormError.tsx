export default function FormError({text}: { text: string }) {
    return (
        <p className="text-red-500 mb-4 text-sm bg-red-50 p-3 rounded border border-red-200">{text}</p>
    )
}