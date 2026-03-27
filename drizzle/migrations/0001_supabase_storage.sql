INSERT INTO storage.buckets (id, name, public)
VALUES ('report-media', 'report-media', true)
ON CONFLICT (id) DO NOTHING;
