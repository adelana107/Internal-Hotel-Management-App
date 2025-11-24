import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://qoijgblprrffigwebqen.supabase.co";
const supabaseKey = "sb_publishable_qk5r23Rbil-JeCWaVmDKDQ_T4AByflO"; // new publishable key

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
 