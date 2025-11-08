import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qoijgblprrffigwebqen.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFvaWpnYmxwcnJmZmlnd2VicWVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2Mjk3MTEsImV4cCI6MjA3ODIwNTcxMX0.hLhbmjOLG1MGyeYSx4A7wJW8in6D6QQbRXpRkip7ZDw";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
