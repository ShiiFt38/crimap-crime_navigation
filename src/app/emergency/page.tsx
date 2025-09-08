'use client'

import { useEffect, useState } from 'react';

export default function Emergency() {
    const [records, setRecords] = useState([]);

    useEffect(() => {
        fetch("/api/crime")
            .then(res => res.json())
            .then(data => setRecords(data));
        console.log(records)
    }, []);

    return (
        <main className="flex-grow bg-gray-100 h-100vh">
            <ul>
                {records.map((rec, idx) => (
                    <li key={idx}>{JSON.stringify(rec)}</li>
                ))}
            </ul>
        </main>
    );
}