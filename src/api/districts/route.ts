// import { NextRequest, NextResponse } from 'next/server';
// import sqlite3 from 'sqlite3';
// import { open } from 'sqlite';
//
// export async function GET(request: NextRequest, { params }: { params: { district: string } }) {
//     const db = await open({
//         filename: './saps_crime_stats.db',
//         driver: sqlite3.Database,
//     });
//
//     // Fetch district details; adjust query based on your schema
//     const district = params.district;
//     const districtData = await db.get(
//         `SELECT d.district_name, d.urban_rural, c.*
//      FROM district d
//      LEFT JOIN crime_record c ON d.district_id = c.district_id
//      WHERE d.district_name = ?`,
//         [district]
//     );
//
//     await db.close();
//
//     if (!districtData) {
//         return NextResponse.json({ error: 'District not found' }, { status: 404 });
//     }
//
//     // Placeholder for crime data aggregation (simplified)
//     const details = {
//         name: districtData.district_name,
//         risk: 'LOW RISK', // Calculate based on crime data if available
//         crimes: districtData.crime_type ? [districtData.crime_type] : [], // Adjust based on your crime table
//     };
//
//     return NextResponse.json(details);
// }