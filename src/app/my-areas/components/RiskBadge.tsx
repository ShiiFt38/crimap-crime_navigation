export default function RiskBadge({ crimeIndex}: {crimeIndex: float}) {
    const level = crimeIndex < 4 ? "low" : crimeIndex > 8 ? "high" : "moderate";
    return (
        <span className={`rounded-full text-[0.75rem] py-[0.25rem] px-[0.75rem] whitespace-nowrap max-w-fit font-[600] uppercase 
        ${level == "low" ? "bg-[#d1fae5] text-[#065f46]" : level == "moderate" ? 
            "bg-[#fef3c7] text-[#92400e]" : "bg-[#fee2e2] text-[#b91c1c]"}`}>
            {level} Risk</span>
    )
}