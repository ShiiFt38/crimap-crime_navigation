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

            <div className="grid grid-cols-1 md:grid-cols-2 space-y-6 gap-x-6 md:px-20">
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
                        {!image ? <div className="space-y-2">
                                <ImageUp size={24} className="mx-auto mb-4 text-gray-400"/>
                                <h3 className="text-lg font-medium text-gray-700 mb-2">
                                    Upload Evidence
                                </h3>
                                <p className="text-sm text-gray-500 mb-4">
                                    Photos, videos, or audio related to the incident
                                </p>
                            </div>
                            : image.length > 0 && (
                            <div className="flex flex-row gap-2 overflow-x-scroll scrollbar-hide">
                                {image.map((file, index) => {
                                    const url = URL.createObjectURL(file);
                                    if (file.type.startsWith('image/')) {
                                        return (
                                            <img
                                                key={index}
                                                src={url}
                                                alt={`Preview ${index + 1}`}
                                                className="max-h-24 max-w-full rounded-lg object-cover"
                                            />
                                        );
                                    } else if (file.type.startsWith('video/')) {
                                        return (
                                            <video
                                                key={index}
                                                src={url}
                                                alt={`Preview ${index + 1}`}
                                                className="max-h-24 max-w-full rounded-lg object-cover"
                                                controls
                                            />
                                        );
                                    } else if (file.type.startsWith('audio/')) {
                                        return (
                                            <audio
                                                key={index}
                                                src={url}
                                                alt={`Preview ${index + 1}`}
                                                className="max-w-full"
                                                controls
                                            />
                                        );
                                    }
                                    return null;
                                })}
                            </div>
                        )}

                        <input
                            type="file"
                            className="hidden"
                            accept="image/*,audio/*,video/*"
                            multiple
                            id="media-upload"
                            onChange={(e) => {
                                const files = Array.from(e.target.files).filter(file => file.size <= 10 * 1024 * 1024);
                                if (files.length > 0) {
                                    onChange({ target: { name: 'image', value: files }});
                                }
                                e.target.value = null;
                            }}
                        />
                        <button
                            type="button"
                            className="block mx-auto bg-[#B05216] active:bg-[#4F2915] border-b-2 border-[#4F2915]
                            text-white px-6 py-2 rounded-lg cursor-pointer text-sm mt-4"
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById('media-upload')?.click();
                            }}>Select Files
                        </button>
                        <small className="text-xs text-gray-400 mt-2">
                            Supported: JPG, PNG, MP4, MP3, WAV (Max 10MB each)
                        </small>
                    </div>
                </div>
            </div>
        </div>
    )
}