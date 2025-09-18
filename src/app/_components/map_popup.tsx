interface MapPopupProps {
    district_name: string
}

export default function MapPopup({district_name} :MapPopupProps) {
    return (
        <div>
            <div>
                <h2>{district_name}</h2>
                <p>Metropolitan district</p>
            </div>
        </div>
    )
}