import { createClient } from '@supabase/supabase-js'

// URL-ul corectat după ID-ul din browserul tău:
const supabaseUrl = 'https://epzpgjonyxgdsbvulyma.supabase.co'

// Cheia ANON (cea care începe cu eyJ...)
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwenBnam9ueXhnZHNidnVseW1hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4NTg2MTEsImV4cCI6MjA5MDQzNDYxMX0.gVfcEs8g5OLq4r7RkelJbR_Z7taZD-PjLyQrKYr20nM'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)