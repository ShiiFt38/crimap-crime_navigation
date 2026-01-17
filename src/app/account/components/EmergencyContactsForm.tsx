'use client'

import { Phone, LoaderCircle } from "lucide-react"
import { useEffect, useState } from "react";
import Select from "react-select";
import EmergencyContact from "./EmergencyContact";
import SubmitBtn from "@/app/account/components/SubmitBtn";
import FormError from "@/lib/modules/components/FormError";
import FormSuccess from "@/lib/modules/components/FormSuccess";

type Contact = {
    contact_id: number;
    contact_name: string;
    phone_number: string;
    relationship: string | null;
};

export default function EmergencyContactsForm() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [formData, setFormData] = useState<{
        contact_id: number | null;
        contact_name: string;
        phone_number: string;
        relationship: string;
    }>({
        contact_id: null,
        contact_name: "",
        phone_number: "",
        relationship: "Family",
    });
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const errorMessages = {
        MISSING_FIELDS: "Contact name and phone number are required.",
        NOT_FOUND: "Contact not found.",
        MISSING_ID: "Contact ID is required for deletion.",
        default: "An unexpected error occurred. Please try again later."
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        setInitialLoading(true);
        setError(null);
        try {
            const response = await fetch("/api/account/emergency-contacts");
            if (!response.ok) {
                throw new Error("Failed to fetch contacts");
            }
            const data = await response.json();
            setContacts(data);
        } catch (err) {
            setError("Failed to load emergency contacts. Please try again.");
        } finally {
            setInitialLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setLoading(true);

        const { contact_id, contact_name, phone_number, relationship } = formData;
        if (!contact_name.trim() || !phone_number.trim()) {
            setError(errorMessages.MISSING_FIELDS);
            setLoading(false);
            return;
        }

        try {
            const method = contact_id ? "PUT" : "POST";
            const response = await fetch("/api/account/emergency-contacts", {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ contact_id, contact_name, phone_number, relationship }),
            });

            const res = await response.json();
            if (!response.ok) {
                setError(errorMessages[res.error as keyof typeof errorMessages] || errorMessages.default);
                setLoading(false);
                return;
            }

            setSuccess(contact_id ? "Contact updated successfully!" : "Contact added successfully!");
            setFormData({ contact_id: null, contact_name: "", phone_number: "", relationship: "Family" });
            await fetchContacts();
        } catch (err) {
            console.log("Emergency Contact error: ", err);
            setError((err as Error).message || errorMessages.default);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (contact: Contact) => {
        setFormData({
            contact_id: contact.contact_id,
            contact_name: contact.contact_name,
            phone_number: contact.phone_number,
            relationship: contact.relationship || "Family",
        });
        setError(null);
        setSuccess(null);
    };

    const handleDelete = async (contact_id: number) => {
        if (!confirm("Are you sure you want to delete this contact?")) return;
        setError(null);
        setSuccess(null);
        setLoading(true);

        try {
            const response = await fetch("/api/account/emergency-contacts", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ contact_id }),
            });

            const res = await response.json();
            if (!response.ok) {
                setError(errorMessages[res.error as keyof typeof errorMessages] || errorMessages.default);
                setLoading(false);
                return;
            }

            setSuccess("Contact deleted successfully!");
            await fetchContacts();
        } catch (err) {
            setError((err as Error).message || errorMessages.default);
        } finally {
            setLoading(false);
        }
    };

    const handleCancelEdit = () => {
        setFormData({ contact_id: null, contact_name: "", phone_number: "", relationship: "Family" });
        setError(null);
        setSuccess(null);
    };

    const relationshipOptions = [
        {value: "Family", label: "Family" },
        {value: "Friend", label: "Friend"},
        {value: "Colleague", label: "Colleague"},
    ]

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Emergency Contacts</h3>
                <div className="py-[0.25rem] px-[0.75rem] bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    {initialLoading || loading ? <LoaderCircle className="animate-spin text-gray-500" size={16} /> :
                        <Phone size={16} className="text-green-600" />}
                </div>
            </div>
            <form className="group flex flex-col space-y-4 md:px-16" onSubmit={handleSubmit}>
                {error && <FormError text={error} />}
                {success && <FormSuccess text={success} />}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Contact Name *</label>
                    <input
                        type="text"
                        name="contact_name"
                        onChange={handleChange}
                        value={formData.contact_name}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg transition-all"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <input
                        type="tel"
                        name="phone_number"
                        onChange={handleChange}
                        value={formData.phone_number}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg transition-all"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Relationship</label>
                    <Select
                        name="relationship"
                        onChange={(selectedOption) => {
                            handleChange({ target: {name: "relationship", value: selectedOption ? selectedOption.value : ''}});
                        }}
                        value={relationshipOptions.find((option) => option.value === formData.relationship) || null}
                        className="w-full rounded-lg"
                        options={relationshipOptions}
                        classNamePrefix="select"
                        placeholder="What is your relationship with the contact?"
                        isClearable

                    />
                </div>
                <div className="flex space-x-4">
                    <SubmitBtn name={formData.contact_id ? "Update Contact" : "Add Contact"} />
                    {formData.contact_id && (
                        <button
                            type="button"
                            onClick={handleCancelEdit}
                            className="bg-gray-100 active:bg-[#4F2915] cursor-pointer border-b-2 border-[#4F2915]
                            active:text-white text-gray-700 py-2 px-3 rounded-lg text-sm font-medium"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            {contacts.length === 0 && !formData.contact_id ? (
                <p className="text-center text-gray-500 mt-6">No emergency contacts added yet. Add one above.</p>
            ) : (
                <div className="mt-6 md:px-16 max-h-[240px] overflow-y-auto snap-y snap-mandatory">
                    {contacts.map((contact, index) => (
                        <div key={index} className="snap-start h-[80px]">
                            <EmergencyContact
                                contact={contact}
                                handleEdit={handleEdit}
                                handleDelete={handleDelete}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}