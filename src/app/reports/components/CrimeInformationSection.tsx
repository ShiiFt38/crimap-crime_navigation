// app/reports/components/CrimeInformationSection.tsx
import { TriangleAlert } from "lucide-react";
import Select from "react-select";

interface CrimeInformationProps {
    offence: number | ""; // Now stores offence_id (number) or empty
    severity: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

// Map offence_id → name (from your DB dump)
const offenceOptions = [
    { value: 1, label: "Murder" },
    { value: 2, label: "Attempted murder" },
    { value: 3, label: "Culpable homicide" },
    { value: 4, label: "Robbery with aggravating circumstances" },
    { value: 5, label: "Common robbery" },
    { value: 6, label: "Public violence" },
    { value: 7, label: "Rape" },
    { value: 8, label: "Sexual assault" },
    { value: 9, label: "Crimen injuria" },
    { value: 10, label: "Neglect and ill-treatment of children" },
    { value: 11, label: "Kidnapping" },
    { value: 12, label: "Abduction" },
    { value: 13, label: "Assault with the intent to inflict grievous bodily harm" },
    { value: 14, label: "Common assault" },
    { value: 15, label: "Burglary at non-residential premises" },
    { value: 16, label: "Burglary at residential premises" },
    { value: 17, label: "Stock-theft" },
    { value: 18, label: "Shoplifting" },
    { value: 19, label: "Theft of motor vehicle and motorcycle" },
    { value: 20, label: "Theft out of or from motor vehicle" },
    { value: 21, label: "All theft not mentioned elsewhere" },
    { value: 22, label: "Arson" },
    { value: 23, label: "Malicious damage to property" },
    { value: 24, label: "Commercial crime" },
    { value: 25, label: "Drug-related crime" },
    { value: 26, label: "Driving under the influence of alcohol or drugs" },
    { value: 27, label: "Illegal possession of firearms and ammunition" },
    { value: 28, label: "Carjacking" },
    { value: 29, label: "Truck hijacking" },
    { value: 30, label: "Robbery of cash in transit" },
    { value: 31, label: "Bank robbery" },
    { value: 32, label: "Robbery at residential premises" },
    { value: 33, label: "Robbery at non-residential premises" },
    { value: 34, label: "Attempted sexual offences" },
    { value: 35, label: "Contact sexual offences" },
    { value: 36, label: "Sexual offences detected as a result of police action" },
    { value: 37, label: "Sexual offences" },
    { value: 38, label: "TRIO Crime" },
    { value: 39, label: "Contact crime (Crimes against the person)" },
    { value: 40, label: "Contact-related Crime" },
    { value: 41, label: "Property-related Crime" },
    { value: 42, label: "Other serious Crime" },
    { value: 43, label: "Crime detected as a result of police action" },
    { value: 44, label: "17 Community reported serious Crime" },
];

const severityOptions = [
    { value: "low", label: "Minor incident" },
    { value: "medium", label: "Moderate concern" },
    { value: "high", label: "Serious incident" },
    { value: "critical", label: "Critical - Emergency" },
];

export default function CrimeInformationSection({
                                                    offence,
                                                    severity,
                                                    onChange,
                                                }: CrimeInformationProps) {
    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Crime Information</h3>
                <div className="py-[0.25rem] px-[0.75rem] bg-red-100 rounded-lg flex items-center justify-center mr-4">
                    <TriangleAlert size={16} className="text-red-600 text-xl" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 space-y-6 gap-x-6 md:px-20">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Type of Crime *
                    </label>
                    <Select
                        name="offence"
                        value={offenceOptions.find((opt) => opt.value === offence) || null}
                        onChange={(selected) =>
                            onChange({
                                target: { name: "offence", value: selected ? selected.value : "" },
                            } as any)
                        }
                        options={offenceOptions}
                        className="w-full rounded-lg"
                        classNamePrefix="select"
                        placeholder="Select crime type..."
                        isClearable
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Severity Level
                    </label>
                    <Select
                        name="severity"
                        value={severityOptions.find((opt) => opt.value === severity) || null}
                        onChange={(selected) =>
                            onChange({
                                target: { name: "severity", value: selected ? selected.value : "" },
                            } as any)
                        }
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