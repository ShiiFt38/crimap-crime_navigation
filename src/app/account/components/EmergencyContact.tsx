import {Pencil, Trash} from "lucide-react";

interface Contact {
    contact_id: number;
    contact_name: string;
    phone_number: string;
    relationship: string | null;
};

interface ContactProps {
    contact: Contact;
    handleEdit: (contact: Contact) => void;
    handleDelete: (contact: number) => void;
}

export default function EmergencyContact({contact, handleEdit, handleDelete}: ContactProps) {
    return (
        <div
            key={contact.contact_id}
            className="flex flex-row justify-between items-start md:items-center p-4
                                    bg-gray-50 rounded-lg border border-gray-200"
        >
            <div className="w-full flex-row space-x-4 ">
                <p className="block font-medium text-gray-900">{contact.contact_name}</p>
                <p className="inline text-sm items text-gray-600">{contact.phone_number}</p>
                <p className="inline text-sm text-gray-500 capitalize">{contact.relationship}</p>
            </div>
            <div className="flex space-x-3 mt-3 md:mt-0">
                <button
                    onClick={() => handleEdit(contact)}
                    className="text-blue-600 hover:text-blue-800 transition-colors
                                            hover:bg-gray-100 rounded-full p-2 cursor-pointer"
                    aria-label="Edit contact"
                >
                    <Pencil size={16} />
                </button>
                <button
                    onClick={() => handleDelete(contact.contact_id)}
                    className="text-red-600 hover:text-red-800 transition-colors
                                            hover:bg-gray-100 rounded-full p-2 cursor-pointer"
                    aria-label="Delete contact"
                >
                    <Trash size={16} />
                </button>
            </div>
        </div>
    )
}