// TODO: Create individual components for the forms

import { TriangleAlert, MapPin, BookText, Check, ImageUp, Lock } from "lucide-react"

export default function ReportForm(){
    return (
        <div id="submitContent" className="max-w-4xl mx-auto px-4 py-6">
            <form className="space-y-8">
                {/*Crime Information Section*/}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            Crime Information
                        </h2>
                        <div className="py-[0.25rem] px-[0.75rem] bg-red-200 rounded-lg flex items-center
                           justify-center mr-4">
                            <TriangleAlert size={16} className="text-red-600"/>
                        </div>
                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Type of Crime *</label>
                            <select
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2
                                focus:ring-safety-blue focus:border-transparent">
                                <option>Select crime type...</option>
                                <option>Theft</option>
                                <option>Assault</option>
                                <option>Vandalism</option>
                                <option>Burglary</option>
                                <option>Drug Activity</option>
                                <option>Suspicious Activity</option>
                                <option>Other</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2"
                            >Severity Level</label>
                            <select
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2
                                focus:ring-safety-blue focus:border-transparent">
                                <option>Select severity...</option>
                                <option>Low - Minor incident</option>
                                <option>Medium - Moderate concern</option>
                                <option>High - Serious incident</option>
                                <option>Critical - Emergency</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/*Location & Time Section*/}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            Location & Time
                        </h2>
                        <div className="py-[0.25rem] px-[0.75rem] bg-gray-200 rounded-lg flex items-center
                           justify-center mr-4">
                            <MapPin size={16} className="text-gray-600"/>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                            <div className="space-y-3">
                                <button
                                    type="button"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-left
                                    text-gray-700 hover:bg-gray-50 flex items-center justify-between
                                    bg-blue-50 border-safety-blue">
                                    <div className="flex items-center">
                                        <MapPin size={16} className="mr-4"/>
                                        <span className="font-medium text-safety-blue"
                                        >Use current location</span>
                                    </div>
                                    <Check size={16}/>
                                </button>
                                <div className="text-center text-gray-500 text-sm">or</div>
                                <input
                                    type="text"
                                    placeholder="Enter address, intersection, or landmark"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2
                                    focus:ring-safety-blue focus:border-transparent"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2"
                            >Date *</label
                            >
                            <input
                                type="date"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2
                                focus:ring-safety-blue focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2"
                            >Time *</label
                            >
                            <input
                                type="time"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2
                                focus:ring-safety-blue focus:border-transparent"
                            />
                        </div>
                    </div>
                </div>

                {/*Details & Evidence Section*/}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            Details & Evidence
                        </h2>
                        <div className="py-[0.25rem] px-[0.75rem] bg-emerald-200 rounded-lg flex items-center
                           justify-center mr-4">
                            <BookText size={16} className="text-emerald-600"/>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2"
                            >Description</label
                            >
                            <textarea
                                rows={4}
                                placeholder="Describe what happened in detail. Include any relevant information about suspects, vehicles, or other important details..."
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-safety-blue focus:border-transparent resize-none"
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2"
                            >Witnesses Present</label
                            >
                            <select
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-safety-blue focus:border-transparent"
                            >
                                <option>Select...</option>
                                <option>Yes - Multiple witnesses</option>
                                <option>Yes - One witness</option>
                                <option>No witnesses</option>
                                <option>Unknown</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2"
                            >Police Contacted</label
                            >
                            <select
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-safety-blue focus:border-transparent"
                            >
                                <option>Select...</option>
                                <option>Yes - Police responded</option>
                                <option>Yes - Report filed</option>
                                <option>No - Not contacted</option>
                                <option>Planning to contact</option>
                            </select>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2"
                            >Media Evidence (Optional)</label
                            >
                            <div
                                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors"
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
                                    className="bg-safety-blue hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                                >
                                    Choose Files
                                </button>
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

                {/*Privacy & Submission Section*/}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            Privacy & Submission
                        </h2>
                        <div className="py-[0.25rem] px-[0.75rem] bg-yellow-200 rounded-lg flex items-center
                           justify-center mr-4">
                            <Lock size={16} className="text-yellow-600"/>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div
                                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                            >
                                <div>
                  <span className="text-sm font-medium text-gray-700"
                  >Submit Anonymously</span
                  >
                                    <p className="text-xs text-gray-500 mt-1">
                                        Your identity will not be shared publicly
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    className="relative inline-flex h-6 w-11 items-center rounded-full bg-safety-blue transition-colors focus:outline-none focus:ring-2 focus:ring-safety-blue focus:ring-offset-2"
                                >
                  <span
                      className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6"
                  ></span>
                                </button>
                            </div>

                            <div className="flex items-start space-x-3">
                                <input
                                    type="checkbox"
                                    className="mt-1 h-4 w-4 text-safety-blue focus:ring-safety-blue border-gray-300 rounded"
                                />
                                <label className="text-sm text-gray-700">
                                    I understand this report may be shared with local authorities
                                    and community safety organizations
                                </label>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2"
                                >Contact Information (Optional)</label
                                >
                                <input
                                    type="email"
                                    placeholder="your.email@example.com"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-safety-blue focus:border-transparent"
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
                                    placeholder="(555) 123-4567"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-safety-blue focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex flex-col sm:flex-row gap-4">
                        <button
                            type="submit"
                            className="flex-1 bg-safety-red hover:bg-red-700 text-white font-bold py-4 px-6 rounded-lg transition-colors flex items-center justify-center"
                        >
                            <svg
                                className="w-5 h-5 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                ></path>
                            </svg>
                            Submit Crime Report
                        </button>
                        <button
                            type="button"
                            className="flex-1 sm:flex-initial bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-4 px-6 rounded-lg transition-colors"
                        >
                            Save as Draft
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}