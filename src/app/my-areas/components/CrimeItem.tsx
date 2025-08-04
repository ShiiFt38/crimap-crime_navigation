
interface CrimeItem {
    crime: string;
    timestamp: string;
}

export default function crimeItem({crime, timestamp}: CrimeItem){
    return (
        <div className="border-l-[3px] pl-[0.75rem] mb-[0.5rem] crime-vandalism text-sm">
            <p className="font-medium">{crime}</p>
            <p className="text-gray-500 text-xs">{timestamp}</p>
        </div>
    )
}