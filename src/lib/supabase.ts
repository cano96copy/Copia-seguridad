import { createClient } from '@supabase/supabase-js'

// Cliente público (para operaciones normales con RLS)
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
)
