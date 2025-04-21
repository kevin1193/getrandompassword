import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Initialize session ID immediately
if (!localStorage.getItem('session_id')) {
  localStorage.setItem('session_id', crypto.randomUUID());
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const trackAnalyticsEvent = async (
  eventType: 'password_generated' | 'password_copied',
  data: {
    passwordLength?: number;
    passwordStrength?: number;
    characterTypes?: Record<string, number>;
  }
) => {
  const sessionId = localStorage.getItem('session_id')!;

  return supabase
    .from('analytics_events')
    .insert({
      event_type: eventType,
      password_length: data.passwordLength,
      password_strength: data.passwordStrength,
      character_types: data.characterTypes,
      session_id: sessionId,
    });
};

export const fetchAnalyticsBySession = async (sessionId: string) => {
  const { data: events } = await supabase
    .from('analytics_events')
    .select('*')
    .eq('session_id', sessionId)
    .order('created_at', { ascending: true });
  
  return events;
};