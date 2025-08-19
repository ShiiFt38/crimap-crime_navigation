import { TriangleAlert } from "lucide-react";

interface CrimeInformationProps {
    offence: string;
    severity: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function CrimeInformationSection({offence, severity, onChange,}: CrimeInformationProps) {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    Crime Information
                </h2>
                <div className="py-[0.25rem] px-[0.75rem] bg-red-200 rounded-lg flex items-center justify-center mr-4">
                    <TriangleAlert size={16} className="text-red-600" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type of Crime *</label>
                    <select
                        name="offence"
                        value={offence}
                        onChange={onChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-safety-blue focus:border-transparent"
                    >
                        <option value="">Select crime type...</option>
                        <option value="Theft">Theft</option>
                        <option value="Assault">Assault</option>
                        <option value="Vandalism">Vandalism</option>
                        <option value="Burglary">Burglary</option>
                        <option value="Drug Activity">Drug Activity</option>
                        <option value="Suspicious Activity">Suspicious Activity</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Severity Level</label>
                    <select
                        name="severity"
                        value={severity}
                        onChange={onChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-safety-blue focus:border-transparent"
                    >
                        <option value="">Select severity...</option>
                        <option value="Low - Minor incident">Low - Minor incident</option>
                        <option value="Medium - Moderate concern">Medium - Moderate concern</option>
                        <option value="High - Serious incident">High - Serious incident</option>
                        <option value="Critical - Emergency">Critical - Emergency</option>
                    </select>
                </div>
            </div>
        </div>
    );
}