export default function FormSuccess ({ text }: { text: string }) {
    return (
        <p className="text-green-500 mb-4 text-sm bg-green-50 p-3 rounded border border-green-200"
        >{text}</p>
    )
}