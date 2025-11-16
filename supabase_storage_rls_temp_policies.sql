-- Pour le bucket 'media'
DROP POLICY IF EXISTS "Allow all read access to media for testing" ON storage.objects;
DROP POLICY IF EXISTS "Allow all upload to media for testing" ON storage.objects;
DROP POLICY IF EXISTS "Allow all delete from media for testing" ON storage.objects;

CREATE POLICY "Allow all read access to media for testing" ON storage.objects FOR SELECT USING (bucket_id = 'media');
CREATE POLICY "Allow all upload to media for testing" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'media');
CREATE POLICY "Allow all delete from media for testing" ON storage.objects FOR DELETE USING (bucket_id = 'media');