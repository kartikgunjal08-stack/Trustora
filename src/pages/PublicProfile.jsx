import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { businessService } from "../services/businessService";
import { reviewService } from "../services/reviewService";
import LegalNotice from "../components/LegalNotice";

export default function PublicProfile() {
  const { slug } = useParams();

  const [business, setBusiness] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    async function loadPublicData() {
      try {
        const biz = await businessService.getBusinessBySlug(slug);
        setBusiness(biz);

        // ⚠️ फक्त `is_approved = true` असलेलेच रिव्ह्यू फेच करणे
        const revs = await reviewService.getApprovedReviewsByBusinessId(biz.id);
        setReviews(revs || []);
      } catch (err) {
        console.error("Error loading public profile:", err);
        setErrorMsg("Business profile not found.");
      } finally {
        setLoading(false);
      }
    }
    loadPublicData();
  }, [slug]);

  if (loading) {
    return (
      <div style={styles.centerContainer}>
        <p style={{ color: "#94a3b8" }}>Loading verified profile...</p>
      </div>
    );
  }

  if (errorMsg || !business) {
    return (
      <div style={styles.centerContainer}>
        <div style={styles.card}>
          <h2 style={{ color: "#ef4444" }}>404</h2>
          <p style={{ color: "#94a3b8", fontSize: "14px" }}>Profile does not exist.</p>
        </div>
      </div>
    );
  }

  const totalReviews = reviews.length;
  const avgRating = totalReviews > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1)
    : "5.0";

  return (
    <div style={styles.pageContainer}>
      <div style={styles.container}>
        <div style={styles.heroCard}>
          <div style={styles.badge}>Verified Business</div>
          <h1 style={styles.businessTitle}>{business.name}</h1>
          <p style={styles.description}>{business.description || business.category}</p>

          <div style={styles.statsRow}>
            <div>
              <span style={styles.statNumber}>★ {avgRating}</span>
              <span style={styles.statLabel}>Average Rating</span>
            </div>
            <div>
              <span style={styles.statNumber}>{totalReviews}</span>
              <span style={styles.statLabel}>Public Reviews</span>
            </div>
          </div>

          <Link to={`/review/${slug}`} style={styles.leaveReviewBtn}>
            Leave a Review
          </Link>
        </div>

        <div style={styles.reviewsSection}>
          <h2 style={styles.sectionHeading}>Customer Feedback</h2>

          {reviews.length === 0 ? (
            <div style={styles.emptyReviews}>
              <p style={{ color: "#94a3b8", fontSize: "14px", margin: 0 }}>No public reviews available yet.</p>
            </div>
          ) : (
            <div style={styles.reviewList}>
              {reviews.map((rev) => (
                <div key={rev.id} style={styles.reviewCard}>
                  <div style={styles.reviewHeader}>
                    <span style={styles.reviewerName}>{rev.reviewer_name}</span>
                    <span style={styles.reviewStars}>{"★".repeat(rev.rating)}</span>
                  </div>
                  <p style={styles.reviewText}>"{rev.review_text}"</p>
                  <span style={styles.verifiedTag}>✓ Verified Customer</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <LegalNotice />
      </div>
    </div>
  );
}

const styles = {
  pageContainer: { minHeight: "100vh", backgroundColor: "#090d16", color: "#fff", padding: "40px 20px", fontFamily: "sans-serif" },
  centerContainer: { minHeight: "100vh", backgroundColor: "#090d16", display: "flex", justifyContent: "center", alignItems: "center" },
  container: { maxWidth: "600px", margin: "0 auto" },
  card: { backgroundColor: "#131d31", padding: "30px", borderRadius: "16px", textAlign: "center" },
  heroCard: { backgroundColor: "#131d31", padding: "32px", borderRadius: "20px", border: "1px solid #1e293b", textAlign: "center", marginBottom: "24px" },
  badge: { display: "inline-block", padding: "4px 12px", backgroundColor: "rgba(56, 189, 248, 0.1)", color: "#38bdf8", borderRadius: "20px", fontSize: "11px", fontWeight: "700", marginBottom: "12px" },
  businessTitle: { fontSize: "26px", fontWeight: "800", margin: "0 0 8px 0" },
  description: { fontSize: "13px", color: "#94a3b8", marginBottom: "20px" },
  statsRow: { display: "flex", justifyContent: "center", gap: "32px", marginBottom: "20px", paddingTop: "16px", borderTop: "1px solid #1e293b" },
  statNumber: { display: "block", fontSize: "20px", fontWeight: "800", color: "#f59e0b" },
  statLabel: { fontSize: "11px", color: "#94a3b8" },
  leaveReviewBtn: { display: "block", width: "100%", padding: "12px", backgroundColor: "#22c55e", color: "#090d16", borderRadius: "10px", fontWeight: "700", textDecoration: "none", boxSizing: "border-box" },
  reviewsSection: { marginTop: "24px" },
  sectionHeading: { fontSize: "16px", fontWeight: "700", marginBottom: "12px", color: "#38bdf8" },
  emptyReviews: { backgroundColor: "#131d31", padding: "20px", borderRadius: "12px", textAlign: "center" },
  reviewList: { display: "flex", flexDirection: "column", gap: "12px" },
  reviewCard: { backgroundColor: "#131d31", padding: "16px", borderRadius: "12px", border: "1px solid #1e293b" },
  reviewHeader: { display: "flex", justifyContent: "space-between", marginBottom: "6px" },
  reviewerName: { fontWeight: "700", fontSize: "13px" },
  reviewStars: { color: "#f59e0b", fontSize: "12px" },
  reviewText: { fontSize: "13px", color: "#cbd5e1", margin: "0 0 8px 0" },
  verifiedTag: { fontSize: "10px", color: "#4ade80", backgroundColor: "rgba(34, 197, 94, 0.1)", padding: "2px 6px", borderRadius: "4px" }
};