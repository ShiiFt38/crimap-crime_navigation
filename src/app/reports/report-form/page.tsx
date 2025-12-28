//TODO: Add focus rings on form inputs for real time form verification

'use client'

import { useState } from 'react';
import CrimeInformationSection from "@/app/reports/components/CrimeInformationSection";
import LocationTimeSection from "@/app/reports/components/LocationTimeSection";
import DetailsEvidenceSection from "@/app/reports/components/DetailsEvidenceSection";
import PrivacySubmissionSection from "@/app/reports/components/PrivacySubmissionSection";
import FormError from "@/lib/modules/components/FormError";
import {LoaderCircle} from "lucide-react";

export default function ReportForm() {
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

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
    });

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
        setError(null);
        setSuccess(null);
        setLoading(true);

        try {
            const response = await fetch("/api/reports/report", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(formData),
            })

            const result = await response.json()

            if (!response.ok){
                setError(result.error || "Failed to submit report")
                setLoading(false)
                return
            }

            setSuccess("Report submitted successfully.")
            setFormData({
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
        } catch (error) {
            setError("Network error. Please try again. ")
        } finally {
            setLoading(false)
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    return (
        <div id="submitContent" className="max-w-7xl mx-auto py-10">
            {error && <FormError text={error} />}
            {success &&
                <p className="text-green-500 mb-4 text-sm bg-green-50 p-3 rounded border border-green-200"
                    >{success}</p>}

            <form className="group space-y-8" onSubmit={onSubmit}>
                {/* Crime Information Section */}
                <CrimeInformationSection
                    offence={formData.offence}
                    severity={formData.severity}
                    onChange={handleChange}
                />

                {/* Location & Time Section */}
                <LocationTimeSection
                    useCurrentLocation={formData.useCurrentLocation}
                    location={formData.location}
                    date={formData.date}
                    time={formData.time}
                    onChange={handleChange}
                    setLocation={(value) => setFormData((prev) => ({ ...prev, location: value }))}
                    setUseCurrentLocation={(value) => setFormData((prev) => ({ ...prev, useCurrentLocation: value }))}
                />

                {/* Details & Evidence Section */}
                <DetailsEvidenceSection
                    description={formData.description}
                    witnesses={formData.witnesses}
                    policeContacted={formData.policeContacted}
                    image={formData.image}
                    onChange={handleChange}
                />

                {/* Privacy & Submission Section */}
                <PrivacySubmissionSection
                    anonymous={formData.anonymous}
                    termsConfirmation={formData.termsConfirmation}
                    contactEmail={formData.contactEmail}
                    contactPhone={formData.contactPhone}
                    onChange={handleChange}
                />

                <div className="mt-8 pb-12 flex flex-col sm:flex-row gap-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-10 mx-auto bg-[var(--color-secondary)] active:bg-[var(--color-quarternary)]
                        border-b-2 border-[var(--color-quarternary)]
                      text-white text-sm py-2 rounded-lg cursor-pointer transition-colors
                      group-invalid:bg-[var(--color-tertiary)] group-invalid:border-b-[var(--color-primary)]"
                    >
                        {loading ? <LoaderCircle size={16} className="m-auto animate-spin"/> : "Submit Crime Report"}
                    </button>
                </div>
            </form>
        </div>
    );
}