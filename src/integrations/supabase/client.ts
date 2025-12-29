import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error("La variable d'environnement VITE_SUPABASE_URL n'est pas définie. Veuillez vérifier votre fichier .env.");
}

try {
  // On vérifie si l'URL est valide en essayant de créer un objet URL
  new URL(supabaseUrl);
} catch (error) {
  throw new Error(`La valeur de VITE_SUPABASE_URL n'est pas une URL valide : "${supabaseUrl}"`);
}

if (!supabaseAnonKey) {
  throw new Error("La variable d'environnement VITE_SUPABASE_ANON_KEY n'est pas définie. Veuillez vérifier votre fichier .env.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});