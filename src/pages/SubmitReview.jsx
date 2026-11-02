import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { businessService } from "../services/businessService";
import { reviewService } from "../services/reviewService";

export default function SubmitReview() {
  const { slug } = useParams();
  const [business, setBusiness] = useState(null);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewerName, setReviewerName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBusiness() {
      try {
        const biz = await businessService.getBusinessBySlug(slug);
        setBusiness(biz);
      } catch (err) {
        console.error("Error loading business:", err);
        setErrorMsg("Business not found.");
      } finally {
        setLoading(false);
      }
    }
    fetchBusiness();
  }, [slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!business) return;

    setSubmitting(true);
    setErrorMsg("");

    try {
      const isAutoApproved = Number(rating) >= 4;

      await reviewService.submitReview({
        business_id: business.id,
        rating: Number(rating),
        reviewer_name: reviewerName || "Verified Member",
        review_text: reviewText,
        verification_status: "verified",
        is_approved: isAutoApproved,
      });

      setSubmitted(true);
    } catch (err) {
      console.error("Submission error:", err);
      setErrorMsg(err.message || "Failed to submit review.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div style={styles.centerContainer}>
        <p style={{ color: "#94a3b8" }}>Loading experience...</p>
      </div>
    );
  }

  if (errorMsg || !business) {
    return (
      <div style={styles.centerContainer}>
        <div style={styles.card}>
          <h2 style={{ color: "#ef4444" }}>Error</h2>
          <p style={{ color: "#94a3b8" }}>{errorMsg || "Business profile does not exist."}</p>
        </div>
      </div>
    );
  }

  // ✨ सबमिट झाल्यावर क्रिएटिव्ह सक्सेस स्क्रीन (ज्यामध्ये पब्लिक प्रोफाइलची लिंक असेल)
  if (submitted) {
    return (
      <div style={styles.centerContainer}>
        <div style={styles.card}>
          <div style={styles.successIcon}>⚡</div>
          <h2 style={{ color: "#ffffff", marginBottom: "8px", fontSize: "22px" }}>You're Awesome!</h2>
          <p style={{ color: "#94a3b8", fontSize: "13px", marginBottom: "24px", lineHeight: "1.5" }}>
            Your feedback has been securely registered for <strong style={{ color: "#fff" }}>{business.name}</strong>. Thanks for helping us grow!
          </p>
          <Link to={`/trust/${slug}`} style={styles.publicLinkBtn}>
            Explore Public Trust Wall ↗
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.pageContainer}>
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.topBadge}>Verified Member Check-in</div>
          <h1 style={styles.title}>Rate {business.name}</h1>
          <p style={styles.subtitle}>How was your experience today?</p>

          {errorMsg && <div style={styles.errorBox}>{errorMsg}</div>}

          <form onSubmit={handleSubmit}>
            {/* 🌟 क्रिएटिव्ह इंटरॅक्टिव्ह स्टार्स (गुगलसारखे बोरिंग ड्रॉपडाऊन नाही) */}
            <div style={styles.starContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  style={{
                    ...styles.starItem,
                    color: (hoverRating || rating) >= star ? "#f59e0b" : "#334155",
                  }}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                >
                  ★
                </span>
              ))}
            </div>
            <div style={styles.ratingTextLabel}>
              {rating === 5 && "🔥 Absolute Game Changer!"}
              {rating === 4 && "⭐ Great Experience!"}
              {rating === 3 && "👍 Good, Room for Improvement"}
              {rating === 2 && "⚠️ Needs Attention"}
              {rating === 1 && "❌ Poor Experience"}
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.label}>Your Name</label>
              <input
                type="text"
                required
                value={reviewerName}
                onChange={(e) => setReviewerName(e.target.value)}
                placeholder="e.g. Rohit Sharma"
                style={styles.input}
              />
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.label}>Share Your Experience</label>
              <textarea
                rows={4}
                required
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Tell us what you liked or what we can improve..."
                style={{ ...styles.input, resize: "none" }}
              />
            </div>

            <button type="submit" disabled={submitting} style={styles.primaryBtn}>
              {submitting ? "Publishing..." : "Submit Verified Review"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageContainer: { minHeight: "100vh", backgroundColor: "#090d16", color: "#fff", padding: "40px 20px", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", display: "flex", justifyContent: "center", alignItems: "center" },
  centerContainer: { minHeight: "100vh", backgroundColor: "#090d16", display: "flex", justifyContent: "center", alignItems: "center", padding: "20px" },
  container: { width: "100%", maxWidth: "460px" },
  card: { backgroundColor: "#131d31", padding: "36px 32px", borderRadius: "24px", border: "1px solid #1e293b", textAlign: "center", boxShadow: "0 20px 40px rgba(0,0,0,0.4)" },
  topBadge: { display: "inline-block", padding: "4px 12px", backgroundColor: "rgba(34, 197, 94, 0.1)", color: "#4ade80", borderRadius: "20px", fontSize: "11px", fontWeight: "700", marginBottom: "16px", border: "1px solid rgba(34, 197, 94, 0.2)" },
  title: { fontSize: "24px", fontWeight: "800", margin: "0 0 6px 0", letterSpacing: "-0.5px" },
  subtitle: { fontSize: "13px", color: "#94a3b8", marginBottom: "24px" },
  starContainer: { display: "flex", justifyContent: "center", gap: "10px", marginBottom: "8px" },
  starItem: { fontSize: "36px", cursor: "pointer", transition: "transform 0.15s ease", userSelect: "none" },
  ratingTextLabel: { fontSize: "12px", color: "#38bdf8", fontWeight: "700", marginBottom: "24px", height: "16px" },
  fieldGroup: { marginBottom: "16px", textAlign: "left" },
  label: { display: "block", fontSize: "11px", color: "#94a3b8", fontWeight: "700", textTransform: "uppercase", marginBottom: "6px", letterSpacing: "0.5px" },
  input: { width: "100%", padding: "12px 14px", borderRadius: "12px", border: "1px solid #334155", backgroundColor: "#090d16", color: "#ffffff", fontSize: "14px", boxSizing: "border-box", outline: "none", transition: "border-color 0.2s" },
  primaryBtn: { width: "100%", padding: "14px", backgroundColor: "#22c55e", color: "#090d16", border: "none", borderRadius: "12px", fontWeight: "800", fontSize: "14px", cursor: "pointer", marginTop: "12px", boxShadow: "0 4px 14px rgba(34, 197, 94, 0.25)" },
  publicLinkBtn: { display: "block", width: "100%", padding: "13px", backgroundColor: "#38bdf8", color: "#090d16", borderRadius: "12px", fontWeight: "800", textDecoration: "none", fontSize: "14px", boxSizing: "border-box", boxShadow: "0 4px 14px rgba(56, 189, 248, 0.25)" },
  errorBox: { backgroundColor: "rgba(239, 68, 68, 0.1)", color: "#fca5a5", padding: "10px", borderRadius: "8px", fontSize: "13px", marginBottom: "16px", border: "1px solid #ef4444" },
  successIcon: { width: "54px", height: "54px", backgroundColor: "rgba(56, 189, 248, 0.1)", color: "#38bdf8", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", margin: "0 auto 16px auto", border: "1px solid rgba(56, 189, 248, 0.3)" }
};