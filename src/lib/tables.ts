// src/lib/tables.ts
import { DATABASE_URL } from "./env";
import {
    userSqlite,
    userPg,
    districtSqlite,
    districtPg,
    stationSqlite,
    stationPg,
    offenceSqlite,
    offencePg,
    crimeRecordSqlite,
    crimeRecordPg,
    realTimeReportSqlite,
    realTimeReportPg,
    reportMediaSqlite,
    reportMediaPg,
    reportCommentSqlite,
    reportCommentPg,
    reportUpvoteSqlite,
    reportUpvotePg,
} from "./schema";

const isSqlite = DATABASE_URL.startsWith("file:");

export const userTable = isSqlite ? userSqlite : userPg;
export const districtTable = isSqlite ? districtSqlite : districtPg;
export const stationTable = isSqlite ? stationSqlite : stationPg;
export const offenceTable = isSqlite ? offenceSqlite : offencePg;
export const crimeRecordTable = isSqlite ? crimeRecordSqlite : crimeRecordPg;
export const realTimeReportTable = isSqlite ? realTimeReportSqlite : realTimeReportPg;
export const reportMediaTable = isSqlite ? reportMediaSqlite : reportMediaPg;
export const reportCommentTable = isSqlite ? reportCommentSqlite : reportCommentPg;
export const reportUpvoteTable = isSqlite ? reportUpvoteSqlite : reportUpvotePg;


/**
 * tables.ts — engine-agnostic table selector
 *
 * Each table is defined separately for SQLite and Postgres because:
 *   • Auto-increment primary keys differ (AUTOINCREMENT vs SERIAL)
 *   • Boolean types differ (INTEGER vs BOOLEAN)
 *   • Timestamps differ (TEXT vs TIMESTAMP)
 *
 * This file exports the correct table object based on DATABASE_URL.
 * All queries should import from here instead of using engine-specific tables.
 *
 * Example usage:
 *   import { userTable } from "@/lib/tables";
 *   const users = await db.select().from(userTable);
 *
 * Benefits:
 *   • Single query code works for both SQLite and Supabase Postgres
 *   • No conditional queries throughout your app
 *   • Full portability and easier future migrations
 */
