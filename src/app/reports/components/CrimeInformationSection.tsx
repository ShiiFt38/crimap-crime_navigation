import {TriangleAlert} from "lucide-react";
import Select from "react-select";

interface CrimeInformationProps {
    offence: string;
    severity: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const offenceOptions = [
    { value: 'Murder', label: 'Murder' },
    { value: 'Attempted murder', label: 'Attempted murder' },
    { value: 'Culpable homicide', label: 'Culpable homicide' },
    { value: 'Robbery with aggravating circumstances', label: 'Robbery with aggravating circumstances' },
    { value: 'Common robbery', label: 'Common robbery' },
    { value: 'Public violence', label: 'Public violence' },
    { value: 'Rape', label: 'Rape' },
    { value: 'Sexual assault', label: 'Sexual assault' },
    { value: 'Crimen injuria', label: 'Crimen injuria' },
    { value: 'Neglect and ill-treatment of children', label: 'Neglect and ill-treatment of children' },
    { value: 'Kidnapping', label: 'Kidnapping' },
    { value: 'Abduction', label: 'Abduction' },
    { value: 'Assault with the intent to inflict grievous bodily harm', label: 'Assault with the intent to inflict grievous bodily harm' },
    { value: 'Common assault', label: 'Common assault' },
    { value: 'Burglary at non-residential premises', label: 'Burglary at non-residential premises' },
    { value: 'Burglary at residential premises', label: 'Burglary at residential premises' },
    { value: 'Stock-theft', label: 'Stock-theft' },
    { value: 'Shoplifting', label: 'Shoplifting' },
    { value: 'Theft of motor vehicle and motorcycle', label: 'Theft of motor vehicle and motorcycle' },
    { value: 'Theft out of or from motor vehicle', label: 'Theft out of or from motor vehicle' },
    { value: 'All theft not mentioned elsewhere', label: 'All theft not mentioned elsewhere' },
    { value: 'Arson', label: 'Arson' },
    { value: 'Malicious damage to property', label: 'Malicious damage to property' },
    { value: 'Commercial crime', label: 'Commercial crime' },
    { value: 'Drug-related crime', label: 'Drug-related crime' },
    { value: 'Driving under the influence of alcohol or drugs', label: 'Driving under the influence of alcohol or drugs' },
    { value: 'Illegal possession of firearms and ammunition', label: 'Illegal possession of firearms and ammunition' },
    { value: 'Carjacking', label: 'Carjacking' },
    { value: 'Truck hijacking', label: 'Truck hijacking' },
    { value: 'Robbery of cash in transit', label: 'Robbery of cash in transit' },
    { value: 'Bank robbery', label: 'Bank robbery' },
    { value: 'Robbery at residential premises', label: 'Robbery at residential premises' },
    { value: 'Robbery at non-residential premises', label: 'Robbery at non-residential premises' },
    { value: 'Attempted sexual offences', label: 'Attempted sexual offences' },
    { value: 'Contact sexual offences', label: 'Contact sexual offences' },
    { value: 'Sexual offences detected as a result of police action', label: 'Sexual offences detected as a result of police action' },
    { value: 'Sexual offences', label: 'Sexual offences' },
    { value: 'TRIO Crime', label: 'TRIO Crime' },
    { value: 'Contact crime (Crimes against the person)', label: 'Contact crime (Crimes against the person)' },
    { value: 'Contact-related Crime', label: 'Contact-related Crime' },
    { value: 'Property-related Crime', label: 'Property-related Crime' },
    { value: 'Other serious Crime', label: 'Other serious Crime' },
    { value: 'Crime detected as a result of police action', label: 'Crime detected as a result of police action' },
    { value: '17 Community reported serious Crime', label: '17 Community reported serious Crime' },
];

const severityOptions = [
    {value: 'low', label: 'Minor incident'},
    {value: 'Medium', label: 'Moderate concern'},
    {value: 'High', label: 'Serious incident'},
    {value: 'Critical', label: 'Critical - Emergency'},
]

export default function CrimeInformationSection({offence, severity, onChange,}: CrimeInformationProps) {
    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Crime Information</h3>
                <div className="py-[0.25rem] px-[0.75rem] bg-red-100 rounded-lg flex items-center justify-center mr-4">
                    <TriangleAlert size={16} className="text-red-600 text-xl" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 space-y-4 gap-6 md:px-20">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type of Crime *</label>

                    {/*The onChange attribute receives a manually constructed event-like target object to mimic the
                    structure of React.ChangeEvent where e.target is used*/}
                    <Select
                        name="offence"
                        value={offenceOptions.find(option => option.value === offence) || null}
                        onChange={(selectedOption) =>
                            onChange({ target: { name: 'offence', value: selectedOption ? selectedOption.value : '' } })}
                        className="w-full rounded-lg"
                        options={offenceOptions}
                        classNamePrefix="select"
                        placeholder="Select crime type..."
                        isClearable
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Severity Level</label>
                    <Select
                        name="severity"
                        value={severityOptions.find(option => option.value === severity) || null}
                        onChange={(selectedOption) =>
                            onChange({ target: { name: 'severity', value: selectedOption ? selectedOption.value : '' } })}
                        options={severityOptions}
                        className="w-full"
                        classNamePrefix="select"
                        placeholder="Select severity..."
                        isClearable
                    />
                </div>
            </div>
        </div>
    );
}