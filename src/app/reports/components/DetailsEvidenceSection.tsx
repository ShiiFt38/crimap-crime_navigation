import {BookText, ImageUp, Lock} from "lucide-react";

interface DetailsEvidenceProps {
    description: string;
    witnesses: string;
    policeContacted: string;
    image: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>) => void;
}

export default function DetailsEvidenceSection({ description, witnesses, policeContacted, image, onChange }: DetailsEvidenceProps) {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 ">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Details & Evidence</h3>
                <div className="py-[0.25rem] px-[0.75rem] bg-emerald-100 rounded-lg flex items-center justify-center mr-4">
                    <BookText size={16} className="text-emerald-600 text-xl" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 space-y-6 md:px-20">
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2"
                    >Description</label
                    >
                    <textarea
                        rows={4}
                        name="description"
                        onChange={onChange}
                        value={description}
                        placeholder="Describe what happened in detail. Include any relevant information about suspects, vehicles, or other important details..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    ></textarea>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Witnesses Present</label>
                    <select
                        name="witnesses"
                        onChange={onChange}
                        value={witnesses}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                        <option>Select...</option>
                        <option>Yes - Multiple witnesses</option>
                        <option>Yes - One witness</option>
                        <option>No witnesses</option>
                        <option>Unknown</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Police Contacted</label>
                    <select
                        name="policeContacted"
                        onChange={onChange}
                        value={policeContacted}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg
                        focus:ring-2 focus:ring-safety-blue focus:border-transparent"
                    >
                        <option>Select...</option>
                        <option>Yes - Police responded</option>
                        <option>Yes - Report filed</option>
                        <option>No - Not contacted</option>
                        <option>Planning to contact</option>
                    </select>
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Media Evidence (Optional)</label>
                    <div
                        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center
                        hover:border-gray-400 transition-colors"
                    >
                        <ImageUp size={24} className="mx-auto mb-4 text-gray-400"/>
                        <p className="text-lg font-medium text-gray-700 mb-2">
                            Upload Evidence
                        </p>
                        <p className="text-sm text-gray-500 mb-4">
                            Photos, videos, or audio recordings related to the incident
                        </p>
                        <button
                            type="button"
                            name="image"
                            className="bg-safety-blue bg-[#B05216] active:bg-[#4F2915] border-b-2 border-[#4F2915]
                             text-white px-6 py-2 rounded-lg cursor-pointer text-sm transition-colors"
                        >Choose Files</button>
                        <p className="text-xs text-gray-400 mt-2">
                            Supported: JPG, PNG, MP4, MP3, WAV (Max 10MB each)
                        </p>
                        <input
                            type="file"
                            className="hidden"
                            accept="image/*,audio/*,video/*"
                            multiple
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}