import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://gfwibbxzokrihpvdlbvz.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdmd2ibbxzokrihpvdlbvzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3NTk4OTYsImV4cCI6MjA3NzMzNTg5Nn0.aFD-pqNhTmywgUmZeO_DRqaKd8vIEU8nB0zgr92l_KY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);