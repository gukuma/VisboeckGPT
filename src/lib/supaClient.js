import { createClient } from '@supabase/supabase-js'


let PUBLIC_SUPABASE_URL = process.env.PUBLIC_SUPABASE_URL;
let PUBLIC_SUPABASE_ANON_KEY = process.env.PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY)