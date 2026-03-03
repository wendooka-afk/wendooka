-- ============================================================
-- MIGRATION : Support des landing pages SEO
-- À exécuter dans Supabase > SQL Editor
-- ============================================================

-- Ajouter canonical_url si absent (oubli du setup initial)
ALTER TABLE public.pages
  ADD COLUMN IF NOT EXISTS canonical_url text;

-- Ajouter schema_markup pour les JSON-LD (LocalBusiness, FAQPage, Service)
-- Le champ contient un tableau JSON de schemas Schema.org
ALTER TABLE public.pages
  ADD COLUMN IF NOT EXISTS schema_markup text;

-- ✅ Migration terminée
