import { supabase } from '../lib/supabaseClient';

export const reviewService = {
  // १. नवीन रिव्ह्यू डेटाबेसमध्ये सेव्ह करणे (4-5 स्टार्स true, 1-3 स्टार्स false)
  async submitReview(reviewData) {
    const { data, error } = await supabase
      .from('reviews')
      .insert([reviewData])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  // २. डॅशबोर्डसाठी सर्व रिव्ह्यू मिळवणे (Public + Hidden दोन्ही)
  async getReviewsByBusinessId(businessId) {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('business_id', businessId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  // ३. पब्लिक प्रोफाईलसाठी फक्त APPROVED (is_approved = true) रिव्ह्यू मिळवणे
  async getApprovedReviewsByBusinessId(businessId) {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('business_id', businessId)
      .eq('is_approved', true) // ⚠️ फक्त अप्रूव्ह झालेलेच पब्लिकला दिसतील
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  // ४. रिव्ह्यूचा अप्रूवल स्टेटस बदलणे (Toggle Public/Hidden)
  async updateReviewApproval(reviewId, isApproved) {
    const { data, error } = await supabase
      .from('reviews')
      .update({ is_approved: isApproved })
      .eq('id', reviewId)
      .select();
    if (error) throw error;
    return data;
  },

  // ५. रिव्ह्यू परमनंट डिलीट करणे
  async deleteReview(reviewId) {
    const { data, error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', reviewId);
    if (error) throw error;
    return data;
  }
};