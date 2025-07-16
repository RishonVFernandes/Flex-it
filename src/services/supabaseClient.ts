// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = ''; // Replace with your URL
const supabaseKey = ''; // Replace with your key
export const supabase = createClient(supabaseUrl, supabaseKey);
