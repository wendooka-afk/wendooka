-- Pour la table 'pages'
DROP POLICY IF EXISTS "Public users can view published pages" ON public.pages;
DROP POLICY IF EXISTS "Admin/Editor can view all pages" ON public.pages;
DROP POLICY IF EXISTS "Admin/Editor can manage pages" ON public.pages;
CREATE POLICY "Allow all read access for testing" ON public.pages FOR SELECT USING (true);
CREATE POLICY "Allow all insert access for testing" ON public.pages FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all update access for testing" ON public.pages FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Allow all delete access for testing" ON public.pages FOR DELETE USING (true);

-- Pour la table 'blog_posts'
-- Assurez-vous de supprimer toutes les politiques existantes avant d'ajouter celles-ci
CREATE POLICY "Allow all read access for testing" ON public.blog_posts FOR SELECT USING (true);
CREATE POLICY "Allow all insert access for testing" ON public.blog_posts FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all update access for testing" ON public.blog_posts FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Allow all delete access for testing" ON public.blog_posts FOR DELETE USING (true);

-- Pour la table 'projects'
-- Assurez-vous de supprimer toutes les politiques existantes avant d'ajouter celles-ci
CREATE POLICY "Allow all read access for testing" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Allow all insert access for testing" ON public.projects FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all update access for testing" ON public.projects FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Allow all delete access for testing" ON public.projects FOR DELETE USING (true);

-- Pour la table 'services'
-- Assurez-vous de supprimer toutes les politiques existantes avant d'ajouter celles-ci
CREATE POLICY "Allow all read access for testing" ON public.services FOR SELECT USING (true);
CREATE POLICY "Allow all insert access for testing" ON public.services FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all update access for testing" ON public.services FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Allow all delete access for testing" ON public.services FOR DELETE USING (true);

-- Pour la table 'activity_log'
-- Assurez-vous de supprimer toutes les politiques existantes avant d'ajouter celles-ci
CREATE POLICY "Allow all read access for testing" ON public.activity_log FOR SELECT USING (true);
CREATE POLICY "Allow all insert access for testing" ON public.activity_log FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all update access for testing" ON public.activity_log FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Allow all delete access for testing" ON public.activity_log FOR DELETE USING (true);