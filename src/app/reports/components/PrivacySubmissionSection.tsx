//TODO: Verify incorrectly controlled components below and fix

import {Lock} from "lucide-react";

interface PrivacySubmissionProps {
    anonymous: boolean,
    termsConfirmation: boolean,
    contactEmail: string,
    contactPhone: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

export default function PrivacySubmissionSection({ anonymous, termsConfirmation, contactEmail, contactPhone, onChange }
                                                 : PrivacySubmissionProps) {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 ">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Privacy & Submission</h3>
                <div className="py-[0.25rem] px-[0.75rem] bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                    <Lock size={16} className="text-yellow-600 text-xl" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 space-x-4 space-y-8 md:px-20">
                <div className="space-y-4">
                    <div
                        className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
                        <div>
                  <span className="text-sm font-medium text-gray-700">Submit Anonymously</span>
                            <p className="text-xs text-gray-500 mt-1">
                                Your identity will not be shared publicly
                            </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" name="anonymous" checked={anonymous} className="sr-only peer"
                                   onChange={onChange}/>
                            <div
                                className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4
                            peer-focus:ring-[var(--color-tertiary)] rounded-full peer peer-checked:after:translate-x-full
                            peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px]
                            after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full
                            after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-primary)]"></div>
                        </label>
                    </div>

                    <div className="flex items-start space-x-3">
                        <input
                            type="checkbox"
                            name="termsConfirmation"
                            onChange={onChange}
                            checked={termsConfirmation}
                            required
                            className="mt-1 h-4 w-4 text-safety-blue focus:ring-safety-blue border-gray-300 rounded"
                        />
                        <label className="text-sm text-gray-700">
                            I understand this report may be shared with local authorities
                            and community safety organizations *
                        </label>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2"
                        >Contact Information (Optional)</label>
                        <input
                            type="email"
                            name="contactEmail"
                            onChange={onChange}
                            value={contactEmail}
                            placeholder="your.email@example.com"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg "
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Only used if authorities need to follow up
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2"
                        >Phone Number (Optional)</label
                        >
                        <input
                            type="tel"
                            name="contactPhone"
                            onChange={onChange}
                            value={contactPhone}
                            placeholder="(555) 123-4567"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg "
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

// {
//     "offence": "Vandalism",
//     "severity": "Low - Minor incident",
//     "useCurrentLocation": true,
//     "location": "Witbank, South Africa",
//     "date": "2025-08-13",
//     "time": "18:48",
//     "description": "",
//     "witnesses": "",
//     "policeContacted": "",
//     "image": "",
//     "anonymous": false,
//     "termsConfirmation": false,
//     "contactEmail": "",
//     "contactPhone": ""
// }