export default function OffenceBadge({offence} : {offence?: string}){
    return (
        <span
            className={`rounded-full text-[0.75rem] py-[0.25rem] px-[0.75rem] text-center truncate w-2/4 font-bold 
                ${offence === 'Theft' || offence === 'Shoplifting' || offence === 'Theft of motor vehicle and motorcycle' 
                || offence === 'Theft out of or from motor vehicle' || offence === 'All theft not mentioned elsewhere' 
                || offence === 'Stock-theft' ? 'bg-[#d1fae5] text-[#065f46]' 
                    : offence === 'Murder' || offence === 'Attempted murder' || offence === 'Culpable homicide' 
                        ? 'bg-[#fee2e2] text-[#b91c1c]' 
                        : offence === 'Rape' || offence === 'Sexual assault' || offence === 'Attempted sexual offences' 
                        || offence === 'Contact sexual offences' || offence === 'Sexual offences' 
                        || offence === 'Sexual offences detected as a result of police action' 
                            ? 'bg-[#fef3c7] text-[#92400e]' 
                            : offence === 'Robbery with aggravating circumstances' || offence === 'Common robbery' 
                            || offence === 'Carjacking' || offence === 'Truck hijacking' 
                            || offence === 'Robbery of cash in transit' || offence === 'Bank robbery' 
                            || offence === 'Robbery at residential premises' || offence === 'Robbery at non-residential premises' 
                                ? 'bg-[#e0e7ff] text-[#3730a3]' 
                                : offence === 'Assault with the intent to inflict grievous bodily harm' 
                                || offence === 'Common assault' ? 'bg-[#fce7f3] text-[#831843]'
                                    : offence === 'Burglary at non-residential premises' 
                                    || offence === 'Burglary at residential premises' ? 'bg-[#cffafe] text-[#164e63]'
                                        : offence === 'Arson' || offence === 'Malicious damage to property' 
                                            ? 'bg-[#ffedd5] text-[#9a3412]' 
                                            : offence === 'Drug-related crime' 
                                            || offence === 'Driving under the influence of alcohol or drugs' 
                                            || offence === 'Illegal possession of firearms and ammunition' 
                                                ? 'bg-[#f3e8ff] text-[#6b21a8]' 
                                                : offence === 'Kidnapping' || offence === 'Abduction' 
                                                || offence === 'Neglect and ill-treatment of children' 
                                                    ? 'bg-[#ede9fe] text-[#5b21b6]' 
                                                    : offence === '' ? '' 
                                                        : 'bg-gray-600 text-white'
            }`}>{offence || 'Offence'}</span>
    )
}