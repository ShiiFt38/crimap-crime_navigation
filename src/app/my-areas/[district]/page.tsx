'use client';

import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function DistrictPage() {
    const router = useRouter();
    const crimeChartRef = useRef<HTMLCanvasElement>(null);
    const trendsChartRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        // Initialize Crime Breakdown Pie Chart
        let crimeChart: Chart;
        if (crimeChartRef.current) {
            crimeChart = new Chart(crimeChartRef.current, {
                type: 'doughnut',
                data: {
                    labels: ['Theft', 'Assault', 'Vandalism', 'Drug Offense', 'Burglary', 'Other'],
                    datasets: [{
                        data: [35, 20, 15, 12, 10, 8],
                        backgroundColor: [
                            '#ef4444',
                            '#dc2626',
                            '#f97316',
                            '#eab308',
                            '#8b5cf6',
                            '#6b7280'
                        ],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                padding: 20,
                                usePointStyle: true,
                                font: { size: 12 }
                            }
                        }
                    }
                }
            });
        }

        // Initialize Crime Trends Line Chart
        let trendsChart: Chart;
        if (trendsChartRef.current) {
            trendsChart = new Chart(trendsChartRef.current, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Total Crimes',
                        data: [45, 52, 38, 61, 42, 47],
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        y: { beginAtZero: true, grid: { color: 'rgba(0, 0, 0, 0.05)' } },
                        x: { grid: { display: false } }
                    }
                }
            });
        }

        // Cleanup charts on unmount
        return () => {
            if (crimeChart) crimeChart.destroy();
            if (trendsChart) trendsChart.destroy();
        };
    }, []);

    const goBack = () => {
        router.push("/my-areas");
    }

    return (
        <div className="bg-gray-100 min-h-screen pb-14 font-inter">
            <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }
        
      `}</style>
            {/* Map Section */}
            <div className="h-64 md:h-80 relative bg-linear-135 from-[#667eea] to-[#764ba2] overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <svg className="w-full h-full" viewBox="0 0 400 300">
                        <defs>
                            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" opacity="0.3" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                        <line x1="0" y1="100" x2="400" y2="100" stroke="white" strokeWidth="3" opacity="0.5" />
                        <line x1="0" y1="200" x2="400" y2="200" stroke="white" strokeWidth="3" opacity="0.5" />
                        <line x1="150" y1="0" x2="150" y2="300" stroke="white" strokeWidth="3" opacity="0.5" />
                        <line x1="250" y1="0" x2="250" y2="300" stroke="white" strokeWidth="3" opacity="0.5" />
                    </svg>
                </div>

                {/* Map Controls */}
                <div className="absolute top-4 right-4 flex flex-col space-y-2">
                    <button className="bg-white p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </button>
                    <button className="bg-white p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 12H6" />
                        </svg>
                    </button>
                </div>

                {/* Safety Level Indicator */}
                <div className="absolute bottom-4 left-4 rounded-lg p-3 shadow-lg backdrop-blur-lg">
                    <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-linear-45 from-[#f59e0b] to-[#fbbf24] rounded-full" />
                        <span className="text-sm font-medium text-gray-700">Moderate Risk</span>
                    </div>
                </div>
            </div>

            <header className="bg-white shadow-sm border-b border-gray-200 sticky top-14  z-9">
                <div className="px-4 py-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <button onClick={goBack} className="group p-2 cursor-pointer hover:bg-gray-100 rounded-full">
                                <ArrowLeft className="group-active:text-[#4F2915]"/>
                            </button>
                            <div>
                                <h1 className="text-lg font-semibold text-gray-900">Downtown District</h1>
                                <p className="text-sm text-gray-500">Crime & Safety Overview</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Stats Summary Panel */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <div className="text-2xl font-bold text-gray-900">247</div>
                        <div className="text-sm text-gray-500">Total Crimes</div>
                        <div className="text-xs text-red-500 mt-1">↑ 12% this month</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <div className="text-2xl font-bold text-blue-600">3</div>
                        <div className="text-sm text-gray-500">Police Stations</div>
                        <div className="text-xs text-green-500 mt-1">Well covered</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <div className="text-2xl font-bold text-orange-500">6.2</div>
                        <div className="text-sm text-gray-500">Crime Index</div>
                        <div className="text-xs text-orange-500 mt-1">Moderate</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <div className="text-2xl font-bold text-green-600">89%</div>
                        <div className="text-sm text-gray-500">Safety Score</div>
                        <div className="text-xs text-green-500 mt-1">Above average</div>
                    </div>
                </div>

                {/* Crime Breakdown Chart */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Crime Breakdown by Type</h3>
                    <div className="relative h-[200px]">
                        <canvas ref={crimeChartRef} />
                    </div>
                </div>

                {/* Crime Trends Chart */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Crime Trends (Last 6 Months)</h3>
                    <div className="relative h-[200px]">
                        <canvas ref={trendsChartRef} />
                    </div>
                </div>

                {/* Recent Incidents */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Incidents</h3>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-red-500 rounded-full" />
                                <div>
                                    <div className="font-medium text-gray-900">Theft</div>
                                    <div className="text-sm text-gray-500">Main St & 5th Ave</div>
                                </div>
                            </div>
                            <div className="text-sm text-gray-500">2 days ago</div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-red-600 rounded-full" />
                                <div>
                                    <div className="font-medium text-gray-900">Assault</div>
                                    <div className="text-sm text-gray-500">Park Avenue</div>
                                </div>
                            </div>
                            <div className="text-sm text-gray-500">3 days ago</div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-orange-500 rounded-full" />
                                <div>
                                    <div className="font-medium text-gray-900">Vandalism</div>
                                    <div className="text-sm text-gray-500">Central Plaza</div>
                                </div>
                            </div>
                            <div className="text-sm text-gray-500">1 week ago</div>
                        </div>
                    </div>
                </div>

                {/* Safety Tips */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Safety Tips for This Area</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start space-x-2">
                            <svg className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>Avoid walking alone after 10 PM, especially near Main St</span>
                        </li>
                        <li className="flex items-start space-x-2">
                            <svg className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>Keep valuables secure in crowded areas like Central Plaza</span>
                        </li>
                        <li className="flex items-start space-x-2">
                            <svg className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>Police station is 2 blocks away on Oak Street</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}