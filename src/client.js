import { createClient } from '@supabase/supabase-js';

const URL = Constants.URL;
const API_KEY = Constants.API_KEY;

export const supabase = createClient(URL, API_KEY);

