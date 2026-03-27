CREATE TABLE "user" (
    "user_id" serial PRIMARY KEY NOT NULL,
    "username" text NOT NULL,
    "email" text NOT NULL,
    "password_hash" text NOT NULL,
    "full_name" text,
    "phone" text,
    "default_address" text,
    "default_latitude" real,
    "default_longitude" real,
    "use_current_location" boolean DEFAULT false
);

CREATE UNIQUE INDEX "user_email_unique" ON "user" ("email");

CREATE TABLE "user_preference" (
    "preference_id" serial PRIMARY KEY NOT NULL,
    "user_id" integer NOT NULL,
    "sms_alerts" boolean DEFAULT false,
    "email_alerts" boolean DEFAULT false,
    "push_notifications" boolean DEFAULT false,
    "alert_radius" integer DEFAULT 5
);

CREATE UNIQUE INDEX "user_preference_user_id_unique" ON "user_preference" ("user_id");

CREATE TABLE "offence" (
    "offence_id" serial PRIMARY KEY NOT NULL,
    "offence_name" text NOT NULL
);

CREATE TABLE "province" (
    "province_id" serial PRIMARY KEY NOT NULL,
    "province_name" text NOT NULL
);

CREATE TABLE "district" (
    "district_id" serial PRIMARY KEY NOT NULL,
    "province_id" integer,
    "district_name" text NOT NULL,
    "population" integer
);

CREATE TABLE "station" (
    "station_id" serial PRIMARY KEY NOT NULL,
    "district_id" integer,
    "station_name" text NOT NULL
);

CREATE TABLE "crime_record" (
    "record_id" serial PRIMARY KEY NOT NULL,
    "station_id" integer,
    "offence_id" integer,
    "count" integer NOT NULL,
    "date" timestamp with time zone NOT NULL
);

CREATE TABLE "real_time_report" (
    "report_id" serial PRIMARY KEY NOT NULL,
    "user_id" integer,
    "offence_id" integer NOT NULL,
    "station_id" integer,
    "description" text,
    "location_address" text,
    "latitude" real,
    "longitude" real,
    "timestamp" timestamp with time zone NOT NULL,
    "verification_status" text DEFAULT 'pending',
    "upvotes" integer DEFAULT 0,
    "severity_level" text,
    "witnesses_present" boolean DEFAULT false,
    "police_contacted" boolean DEFAULT false,
    "anonymous" boolean DEFAULT false,
    "contact_email" text,
    "contact_phone" text
);

CREATE INDEX "real_time_report_timestamp_idx" ON "real_time_report" ("timestamp");

CREATE TABLE "report_media" (
    "media_id" serial PRIMARY KEY NOT NULL,
    "report_id" integer NOT NULL,
    "file_path" text NOT NULL,
    "media_type" text,
    "uploaded_at" timestamp with time zone DEFAULT now()
);

CREATE TABLE "report_upvote" (
    "upvote_id" serial PRIMARY KEY NOT NULL,
    "report_id" integer NOT NULL,
    "user_id" integer NOT NULL,
    "timestamp" timestamp with time zone DEFAULT now()
);

CREATE UNIQUE INDEX "report_upvote_report_user_unique" ON "report_upvote" ("report_id", "user_id");

CREATE TABLE "report_comment" (
    "comment_id" serial PRIMARY KEY NOT NULL,
    "report_id" integer NOT NULL,
    "user_id" integer NOT NULL,
    "comment_text" text NOT NULL,
    "timestamp" timestamp with time zone DEFAULT now()
);

CREATE TABLE "emergency_contact" (
    "contact_id" serial PRIMARY KEY NOT NULL,
    "user_id" integer NOT NULL,
    "contact_name" text NOT NULL,
    "phone_number" text NOT NULL,
    "relationship" text
);

ALTER TABLE "user_preference" ADD CONSTRAINT "user_preference_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE cascade;
ALTER TABLE "district" ADD CONSTRAINT "district_province_id_fkey" FOREIGN KEY ("province_id") REFERENCES "province"("province_id");
ALTER TABLE "station" ADD CONSTRAINT "station_district_id_fkey" FOREIGN KEY ("district_id") REFERENCES "district"("district_id");
ALTER TABLE "crime_record" ADD CONSTRAINT "crime_record_station_id_fkey" FOREIGN KEY ("station_id") REFERENCES "station"("station_id");
ALTER TABLE "crime_record" ADD CONSTRAINT "crime_record_offence_id_fkey" FOREIGN KEY ("offence_id") REFERENCES "offence"("offence_id");
ALTER TABLE "real_time_report" ADD CONSTRAINT "real_time_report_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE set null;
ALTER TABLE "real_time_report" ADD CONSTRAINT "real_time_report_offence_id_fkey" FOREIGN KEY ("offence_id") REFERENCES "offence"("offence_id");
ALTER TABLE "real_time_report" ADD CONSTRAINT "real_time_report_station_id_fkey" FOREIGN KEY ("station_id") REFERENCES "station"("station_id");
ALTER TABLE "report_media" ADD CONSTRAINT "report_media_report_id_fkey" FOREIGN KEY ("report_id") REFERENCES "real_time_report"("report_id") ON DELETE cascade;
ALTER TABLE "report_upvote" ADD CONSTRAINT "report_upvote_report_id_fkey" FOREIGN KEY ("report_id") REFERENCES "real_time_report"("report_id") ON DELETE cascade;
ALTER TABLE "report_upvote" ADD CONSTRAINT "report_upvote_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE cascade;
ALTER TABLE "report_comment" ADD CONSTRAINT "report_comment_report_id_fkey" FOREIGN KEY ("report_id") REFERENCES "real_time_report"("report_id") ON DELETE cascade;
ALTER TABLE "report_comment" ADD CONSTRAINT "report_comment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE cascade;
ALTER TABLE "emergency_contact" ADD CONSTRAINT "emergency_contact_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE cascade;
