import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://junffqlhkkmensswxbjd.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1bmZmcWxoa2ttZW5zc3d4YmpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE5MjgyNjUsImV4cCI6MjA0NzUwNDI2NX0.LmXm07VajyWzCUiYGoQkFoc59kVL4bG64jVIowIuUZk';


export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
