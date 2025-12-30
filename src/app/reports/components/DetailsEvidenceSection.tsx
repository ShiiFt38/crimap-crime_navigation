import {BookText, ImageUp} from "lucide-react";
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';

interface DetailsEvidenceProps {
    description: string;
    witnesses: string;
    policeContacted: string;
    image: File[]; // Array of files
    onChange: (e: any) => void; // Allow custom events
}

const witnessOptions = [
    {value: 'Multiple witnesses were present', label: 'Yes - Multiple witnesses'},
    {value: 'One witness was present', label: 'One witness'},
    {value: 'No witnesses were present', label: 'No witnesses'},
    {value: 'Unknown', label: 'Unknown'},
]

const policeContactOptions = [
    {value: 'Police were contacted and responded', label: 'Yes - Police responded'},
    {value: 'Police were contacted and a report was filed', label: "Yes - Report filed"},
    {value: 'Police were not contacted', label: 'No - Not contacted'},
    {value: 'Planning to contact police soon', label: 'Planning to contact'},
]
export default function DetailsEvidenceSection({
                                                   description,
                                                   witnesses,
                                                   policeContacted,
                                                   image,
                                                   onChange,
                                               }: DetailsEvidenceProps) {

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const files = Array.from(e.target.files);
            onChange({
                target: {
                    name: "image",
                    value: files,
                },
            });
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Details & Evidence</h3>
                <div className="py-[0.25rem] px-[0.75rem] bg-emerald-100 rounded-lg flex items-center justify-center mr-4">
                    <BookText size={16} className="text-emerald-600 text-xl" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 space-y-6 gap-x-6 md:px-20">
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                    <textarea
                        rows={4}
                        name="description"
                        onChange={onChange}
                        value={description}
                        required
                        placeholder="Describe what happened in detail..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Witnesses Present *</label>
                    <Select
                        name="witnesses"
                        value={witnessOptions.find(option => option.value === witnesses) || null}
                        onChange={(selectedOption) =>
                            onChange({ target: { name: 'witnesses', value: selectedOption ? selectedOption.value : '' } })}
                        className="w-full rounded-lg"
                        options={witnessOptions}
                        classNamePrefix="select"
                        placeholder="Were there any witnesses?"
                        isClearable
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Police Contacted *</label>
                    <Select
                        name="policeContacted"
                        onChange={(selectedOption) =>
                            onChange({target: {name: 'policeContacted', value: selectedOption ? selectedOption.value : ''}})}
                        value={policeContactOptions.find((option) => option.value === policeContacted) || null}
                        className="w-full rounded-lg"
                        options={policeContactOptions}
                        classNamePrefix="select"
                        placeholder="Select witnesses present..."
                        isClearable
                        required
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Media Evidence (Optional)
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                        {image.length === 0 ? (
                            <div className="space-y-2">
                                <ImageUp size={48} className="mx-auto text-gray-400" />
                                <h3 className="text-lg font-medium text-gray-700">Upload Evidence</h3>
                                <p className="text-sm text-gray-500">Photos, videos, or audio</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-3 gap-4 overflow-y-auto max-h-96">
                                {image.map((file, index) => {
                                    const url = URL.createObjectURL(file);
                                    return file.type.startsWith("image/") ? (
                                        <img key={index} src={url} alt={`Preview ${index}`} className="w-full h-32 object-cover rounded" />
                                    ) : file.type.startsWith("video/") ? (
                                        <video key={index} controls className="w-full h-32 rounded">
                                            <source src={url} />
                                        </video>
                                    ) : (
                                        <audio key={index} controls className="w-full">
                                            <source src={url} />
                                        </audio>
                                    );
                                })}
                            </div>
                        )}

                        <input
                            type="file"
                            id="media-upload"
                            name="image"
                            accept="image/*,video/*,audio/*"
                            multiple
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        <button
                            type="button"
                            onClick={() => document.getElementById("media-upload")?.click()}
                            className="mt-4 bg-[var(--color-secondary)] active:bg-[var(--color-quarternary)]
                            cursor-pointer border-b-2 border-[var(--color-quarternary)] text-white px-10 py-2
                            shadow-md text-sm rounded-lg"
                        >
                            {image.length > 0 ? "Add More" : "Select Files"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}