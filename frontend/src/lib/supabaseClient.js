import { createClient } from '@supabase/supabase-js';

// Set your Supabase project URL and public (publishable) key below
const supabaseUrl = 'https://qnfnmfqdgkwxgbwffqof.supabase.co';
const supabaseKey = 'sb_publishable_ndffGkZBi30R8HsNUXVI4A_dkyaX0Ch'; // Truncated for privacy, paste full key

export const supabase = createClient(supabaseUrl, supabaseKey);