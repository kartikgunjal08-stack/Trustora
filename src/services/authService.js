import { supabase } from '../lib/supabaseClient';

export const authService = {
  // 1. Sign Up
  signUp: async (email, password, fullName) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });
    if (error) throw error;
    return data;
  },

  // 2. Sign In (Login)
  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(), // ई-मेलमधील स्पेस काढून टाकण्यासाठी
      password: password,
    });
    if (error) throw error;
    return data;
  },

  // 3. Sign Out
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  // 4. Get Current User Session
  getCurrentUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) return null;
    return user;
  },
};