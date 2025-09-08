//TODO: Add focus rings on form inputs for real time form verification

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
        }))
    }
    return (
        <div id="submitContent" className="max-w-7xl mx-auto py-10">
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
                <DetailsEvidenceSection
                    description={formData.description}
                    witnesses={formData.witnesses}
                    policeContacted={formData.policeContacted}
                    image={formData.image}
                    onChange={handleChange}/>

                {/*Privacy & Submission Section*/}
                <PrivacySubmissionSection
                    anonymous={formData.anonymous}
                    termsConfirmation={formData.termsConfirmation}
                    contactEmail={formData.contactEmail}
                    contactPhone={formData.contactPhone}
                    onChange={handleChange}/>

                <div className="mt-8 pb-12 flex flex-col sm:flex-row gap-4">
                    <input
                        type="submit"
                        value="Submit Crime Report"
                        className="px-10 mx-auto bg-[#B05216] hover:bg-[#4F2915] border-b-2 border-[#4F2915]
                        text-white text-sm py-2 rounded-lg cursor-pointer transition-colors"
                    />
                </div>
            </form>
        </div>
    )
}