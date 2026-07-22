require("dotenv").config();

const supabaseJs = require("@supabase/supabase-js");

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

const supabase = supabaseJs.createClient(supabaseUrl, supabaseAnonKey);

module.exports = { supabase };
