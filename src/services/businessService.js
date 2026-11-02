import { supabase } from '../lib/supabaseClient';

export const businessService = {
  async getBusinessByOwner(ownerId) {
    const { data, error } = await supabase
      .from('businesses')
      .select('*')
      .eq('owner_id', ownerId)
      .maybeSingle();
    
    if (error) throw error;
    return data;
  },

  async getBusinessBySlug(slug) {
    const { data, error } = await supabase
      .from('businesses')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (error) throw error;
    return data;
  },

  async createBusiness(businessData) {
    const { data, error } = await supabase
      .from('businesses')
      .upsert(businessData, { onConflict: 'owner_id' })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};