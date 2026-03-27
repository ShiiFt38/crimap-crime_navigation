// app/reports/report-form/page.tsx
//TODO: Update real_time_report table and store offence_id in appropriate column with necessary data type

'use client'

import { useState } from 'react';
import CrimeInformationSection from "@/app/reports/components/CrimeInformationSection";
import LocationTimeSection from "@/app/reports/components/LocationTimeSection";
import DetailsEvidenceSection from "@/app/reports/components/DetailsEvidenceSection";
import PrivacySubmissionSection from "@/app/reports/components/PrivacySubmissionSection";
import FormError from "@/lib/modules/components/FormError";
import FormSuccess from "@/lib/modules/components/FormSuccess";
import { LoaderCircle } from "lucide-react";
import {signIn, useSession} from "next-auth/react";

export default function ReportForm() {
    const { data: session } = useSession();

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

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
        image: [] as File[],
        anonymous: false,
        termsConfirmation: false,
        contactEmail: "",
        contactPhone: "",
    });


    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setLoading(true);

        const data = new FormData();
        data.append("offence", formData.offence.toString());
        data.append("severity", formData.severity);
        data.append("location", formData.location);
        data.append("date", formData.date);
        data.append("time", formData.time);
        data.append("description", formData.description);
        data.append("witnesses", formData.witnesses);
        data.append("policeContacted", formData.policeContacted);
        data.append("anonymous", formData.anonymous.toString());
        data.append("termsConfirmation", formData.termsConfirmation.toString());
        data.append("contactEmail", formData.contactEmail);
        data.append("contactPhone", formData.contactPhone);

        // Append multiple files
        if (formData.image && formData.image.length > 0) {
            formData.image.forEach((file) => {
                data.append("media", file); // Use "media" name for multiple files
            });
        }

        try {
            const response = await fetch("/api/reports/report", {
                method: "POST",
                body: data, // Send FormData, not JSON
            });

            const result = await response.json();

            if (!response.ok) {
                setError(result.error || "Failed to submit report");
            } else {
                setSuccess("Report submitted successfully!");
                // Reset form
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
                    image: [],
                    anonymous: false,
                    termsConfirmation: false,
                    contactEmail: "",
                    contactPhone: "",
                });
            }
        } catch (err) {
            setError("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type, checked, files } = e.target as HTMLInputElement;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : type === "file" ? Array.from(files || []) : value,
        }));
    };

    if (!session) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <button onClick={() => signIn()} className="bg-[var(--color-secondary)] active:bg-[var(--color-quarternary)]
                    text-white px-10 py-2 rounded-lg flex cursor-pointer border-b-2 border-[var(--color-quarternary)] items-center
                    shadow-md text-sm">
                    Log In to Submit Reports
                </button>
            </div>)
    }

    return (
        <div className="max-w-7xl mx-auto py-10">
            {error && <FormError text={error} />}
            {success && <FormSuccess text={success} />}

            <form className="group space-y-8" onSubmit={onSubmit}>
                <CrimeInformationSection offence={formData.offence} severity={formData.severity} onChange={handleChange} />
                <LocationTimeSection
                    useCurrentLocation={formData.useCurrentLocation}
                    location={formData.location}
                    date={formData.date}
                    time={formData.time}
                    onChange={handleChange}
                    setLocation={(value) => setFormData((prev) => ({ ...prev, location: value }))}
                    setUseCurrentLocation={(value) => setFormData((prev) => ({ ...prev, useCurrentLocation: value }))}
                />
                <DetailsEvidenceSection
                    description={formData.description}
                    witnesses={formData.witnesses}
                    policeContacted={formData.policeContacted}
                    image={formData.image}
                    onChange={handleChange}
                />
                <PrivacySubmissionSection
                    anonymous={formData.anonymous}
                    termsConfirmation={formData.termsConfirmation}
                    contactEmail={formData.contactEmail}
                    contactPhone={formData.contactPhone}
                    onChange={handleChange}
                />

                <div className="mt-8 pb-12 text-center">
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-10 bg-[#B05216] hover:bg-[#4F2915] border-b-2 border-[#4F2915]
                        text-white text-sm py-2 rounded-lg cursor-pointer transition-colors disabled:opacity-50
                        group-invalid:bg-[var(--color-tertiary)] group-invalid:border-b-[var(--color-primary)]"
                    >
                        {loading ? <LoaderCircle className="animate-spin mx-auto" size={20} /> : "Submit Crime Report"}
                    </button>
                </div>
            </form>
        </div>
    );
}
