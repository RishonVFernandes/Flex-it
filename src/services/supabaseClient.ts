// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL; // Replace with your URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANNON_KEY; // Replace with your key
export const supabase = createClient(supabaseUrl, supabaseKey);

