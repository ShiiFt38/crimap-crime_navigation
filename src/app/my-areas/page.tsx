'use client';

import { useEffect, useState } from 'react';
import { Plus, LoaderCircle } from 'lucide-react';
import AreaCard from '@/app/my-areas/components/AreaCard';

type District = {
    id: number;
    district_name: string;
    crimeIndex: string;
    riskLevel: string;
};

export default function MyAreas() {
    const [districts, setDistricts] = useState<District[]>([]);
    const [page, setPage] = useState(1);
    const [limit] = useState(9); // 3 × 3 grid
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);

    const fetchDistricts = async (pageToFetch: number) => {
        if (loading || done) return;

        setLoading(true);
        try {
            const res = await fetch(
                `/api/districts?page=${pageToFetch}&limit=${limit}`
            );

            if (!res.ok) throw new Error('Request failed');

            const data = await res.json();
            console.log(data.districts)

            const nextBatch: District[] = Array.isArray(data.districts)
                ? data.districts
                : [];

            setDistricts((prev) => [...prev, ...nextBatch]);
            setTotal(typeof data.total === 'number' ? data.total : 0);

            const fetchedCount = pageToFetch * limit;
            if (fetchedCount >= data.total || nextBatch.length === 0) {
                setDone(true);
            }
        } catch (error) {
            console.error('Error fetching districts:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDistricts(1);
    }, []);


    return (
        <main className="flex-grow min-h-[100vh] bg-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">
                        My Areas
                    </h1>
                    <button
                        className="bg-[var(--color-secondary)]
                                   active:bg-[var(--color-quarternary)]
                                   text-white px-10 py-2 rounded-lg
                                   flex cursor-pointer border-b-2
                                   border-[var(--color-quarternary)]
                                   items-center text-center shadow-md text-sm"
                    >
                        <Plus />
                        Add Area
                    </button>
                </div>

                {districts.length === 0 && loading ? (
                    <div className="flex justify-center items-center h-64">
                        <LoaderCircle className="animate-spin" />
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-14">
                            {districts.map((district) => (
                                <AreaCard
                                    key={district.id}
                                    area={district.district_name}
                                    distance={1.2}
                                    crimeIndex={district.crimeIndex}
                                />
                            ))}
                        </div>

                        {!done && (
                            <div className="flex justify-center pb-10">
                                <button
                                    onClick={() => {
                                        const nextPage = page + 1;
                                        setPage(nextPage);
                                        fetchDistricts(nextPage);
                                    }}
                                    disabled={loading}
                                    className={`bg-[var(--color-secondary)] active:bg-[var(--color-quarternary)] text-white px-10 py-2 rounded-lg
                                    ${loading ? "opacity-50 cursor-not-allowed" : "active:bg-[var(--color-quarternary)]"}
                                        flex cursor-pointer border-b-2 border-[var(--color-quarternary)] items-center shadow-md text-sm
                                        group-invalid:bg-[var(--color-tertiary)] group-invalid:border-b-[var(--color-primary)]`}
                                >
                                    {loading ? <LoaderCircle size={16} className="m-auto animate-spin"/> : 'Load More'}
                                </button>
                            </div>
                        )}

                        {done && districts.length > 0 && (
                            <p className="text-center text-gray-500 pb-10">
                                All areas loaded
                            </p>
                        )}
                    </>
                )}
            </div>
        </main>
    );
}
