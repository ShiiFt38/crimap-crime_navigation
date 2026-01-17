import {
    serial,
    integer,
    text,
    real,
    boolean,
    timestamp,
    pgTable,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const user = pgTable("user", {
    userId: serial("user_id").primaryKey(),
    username: text("username").notNull(),
    email: text("email").unique().notNull(),
    passwordHash: text("password_hash").notNull(),
    fullName: text("full_name"),
    phone: text("phone"),
    defaultAddress: text("default_address"),
    defaultLatitude: real("default_latitude"),
    defaultLongitude: real("default_longitude"),
    useCurrentLocation: boolean("use_current_location").default(false),
});

export const offence = pgTable("offence", {
    offenceId: serial("offence_id").primaryKey(),
    offenceName: text("offence_name").notNull(),
});

export const province = pgTable("province", {
    provinceId: serial("province_id").primaryKey(),
    provinceName: text("province_name").notNull(),
});

export const district = pgTable("district", {
    districtId: serial("district_id").primaryKey(),
    provinceId: integer("province_id").references(() => province.provinceId),
    districtName: text("district_name").notNull(),
    population: integer("population"),
});

export const station = pgTable("station", {
    stationId: serial("station_id").primaryKey(),
    districtId: integer("district_id").references(() => district.districtId),
    stationName: text("station_name").notNull(),
});

export const crimeRecord = pgTable("crime_record", {
    recordId: serial("record_id").primaryKey(),
    stationId: integer("station_id").references(() => station.stationId),
    offenceId: integer("offence_id").references(() => offence.offenceId),
    count: integer("count").notNull(),
    date: timestamp("date").notNull(),
});

export const realTimeReport = pgTable("real_time_report", {
    reportId: serial("report_id").primaryKey(),
    userId: integer("user_id").references(() => user.userId),
    offenceId: integer("offence_id").notNull().references(() => offence.offenceId),
    stationId: integer("station_id").references(() => station.stationId),
    description: text("description"),
    locationAddress: text("location_address"),
    latitude: real("latitude"),
    longitude: real("longitude"),
    timestamp: timestamp("timestamp").defaultNow(),
    verificationStatus: text("verification_status").default("pending"),
    upvotes: integer("upvotes").default(0),
    severityLevel: text("severity_level"),
    witnessesPresent: boolean("witnesses_present"),
    policeContacted: boolean("police_contacted"),
});

export const reportMedia = pgTable("report_media", {
    mediaId: serial("media_id").primaryKey(),
    reportId: integer("report_id").notNull().references(() => realTimeReport.reportId),
    filePath: text("file_path").notNull(),
    mediaType: text("media_type"),
    uploadedAt: timestamp("uploaded_at").defaultNow(),
});

export const reportUpvote = pgTable("report_upvote", {
    upvoteId: serial("upvote_id").primaryKey(),
    reportId: integer("report_id").notNull().references(() => realTimeReport.reportId),
    userId: integer("user_id").notNull().references(() => user.userId),
    timestamp: timestamp("timestamp").defaultNow(),
});

export const reportComment = pgTable("report_comment", {
    commentId: serial("comment_id").primaryKey(),
    reportId: integer("report_id").notNull().references(() => realTimeReport.reportId),
    userId: integer("user_id").notNull().references(() => user.userId),
    commentText: text("comment_text").notNull(),
    timestamp: timestamp("timestamp").defaultNow(),
});

export const emergencyContact = pgTable("emergency_contact", {
  contactId: serial("contact_id").primaryKey(),
  userId: integer("user_id").references(() => user.userId, { onDelete: "cascade" }),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  relationship: text("relationship"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Relations (optional for now, but useful for joins)
export const realTimeReportRelations = relations(realTimeReport, ({ many }) => ({
    media: many(reportMedia),
    upvotes: many(reportUpvote),
    comments: many(reportComment),
}));

export const reportMediaRelations = relations(reportMedia, ({ one }) => ({
    report: one(realTimeReport, {
        fields: [reportMedia.reportId],
        references: [realTimeReport.reportId],
    }),
}));

export const reportUpvoteRelations = relations(reportUpvote, ({ one }) => ({
    report: one(realTimeReport, {
        fields: [reportUpvote.reportId],
        references: [realTimeReport.reportId],
    }),
}));

export const reportCommentRelations = relations(reportComment, ({ one }) => ({
    report: one(realTimeReport, {
        fields: [reportComment.reportId],
        references: [realTimeReport.reportId],
    }),
}));