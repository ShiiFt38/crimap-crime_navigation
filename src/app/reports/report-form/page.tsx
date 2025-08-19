'use client'

import { useState } from 'react';
import CrimeInformationSection from "@/app/reports/components/CrimeInformationSection";
import LocationTimeSection from "@/app/reports/components/LocationTimeSection";
import DetailsEvidenceSection from "@/app/reports/components/DetailsEvidenceSection";
import PrivacySubmissionSection from "@/app/reports/components/PrivacySubmissionSection";

export default function ReportForm(){
    const [formData, setFormData] = useState({
        offence: "",
        severity: "",
        useCurrentLocation: false,
        location: "",
        date: "",
        time: "",
        description: "",
        witnesses: "",
        policeContacted: "",
        image: "",
        anonymous: false,
        termsConfirmation: false,
        contactEmail: "",
        contactPhone: "",
    })

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement
        | HTMLTextAreaElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: type === "checkbox" ? checked : value,
            useCurrentLocation: !prevFormData.useCurrentLocation,
        }))
    }
    return (
        <div id="submitContent" className="max-w-4xl mx-auto px-4 py-6">
            <form className="space-y-8" onSubmit={onSubmit}>
                {/*Crime Information Section*/}
                <CrimeInformationSection
                    offence={formData.offence}
                    severity={formData.severity}
                    onChange={handleChange}/>

                {/*Location & Time Section*/}
                <LocationTimeSection
                    useCurrentLocation={formData.useCurrentLocation}
                    location={formData.location}
                    date={formData.date}
                    time={formData.time}
                    onChange={handleChange}/>

                {/*Details & Evidence Section*/}
                <DetailsEvidenceSection />

                {/*Privacy & Submission Section*/}
                <PrivacySubmissionSection />
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <input
                        type="submit"
                        value="Submit Crime Report"
                        className="w-full bg-[#B05216] hover:bg-[#4F2915] border-b-2 border-[#4F2915]
                        text-white font-medium py-3 px-4 rounded-lg
                     transition-colors"
                    />
                </div>
            </form>
        </div>
    )
}