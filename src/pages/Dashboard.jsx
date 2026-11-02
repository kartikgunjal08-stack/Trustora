import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import { businessService } from "../services/businessService";
import { reviewService } from "../services/reviewService";
import QRCodeDisplay from "../components/QRCodeDisplay";
import LegalNotice from "../components/LegalNotice";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [businessName, setBusinessName] = useState("");
  const [category, setCategory] = useState("Fitness & Health Center");
  const [description, setDescription] = useState("");
  const [slug, setSlug] = useState("");
  const [reviews, setReviews] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const currentUser = await authService.getCurrentUser();
        if (!currentUser) {
          navigate("/login");
          return;
        }
        setUser(currentUser);

        try {
          const biz = await businessService.getBusinessByOwner(currentUser.id);
          if (biz) {
            setBusinessName(biz.name || "");
            setCategory(biz.category || "Fitness & Health Center");
            setDescription(biz.description || "");
            setSlug(biz.slug || "");

            fetchReviews(biz.id);
          }
        } catch (err) {
          console.log("No profile found.");
        }
      } catch (err) {
        console.error("Error loading dashboard:", err);
      } finally {
        setLoading(false);
      }
    }
    loadDashboardData();
  }, [navigate]);

  const fetchReviews = async (businessId) => {
    try {
      const revs = await reviewService.getReviewsByBusinessId(businessId);
      setReviews(revs || []);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  };

  const handleToggleApproval = async (reviewId, currentStatus) => {
    try {
      const newStatus = !currentStatus;
      await reviewService.updateReviewApproval(reviewId, newStatus);
      
      // UI State update
      setReviews((prev) =>
        prev.map((r) => (r.id === reviewId ? { ...r, is_approved: newStatus } : r))
      );
    } catch (err) {
      alert("Failed to update status: " + err.message);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        await reviewService.deleteReview(reviewId);
        setReviews((prev) => prev.filter((r) => r.id !== reviewId));
      } catch (err) {
        alert("Failed to delete: " + err.message);
      }
    }
  };

  const handleSaveBusiness = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const generatedSlug = slug || businessName.toLowerCase().replace(/[^a-z0-9]+/g, "-");

      const businessData = {
        owner_id: user.id,
        name: businessName,
        category,
        description,
        slug: generatedSlug,
      };

      const savedBiz = await businessService.createBusiness(businessData);
      setBusinessName(savedBiz.name || "");
      setCategory(savedBiz.category || "");
      setDescription(savedBiz.description || "");
      setSlug(savedBiz.slug || "");
      
      setSuccessMsg("Profile saved successfully!");
      fetchReviews(savedBiz.id);
    } catch (err) {
      console.error("Save error:", err);
      setErrorMsg(err.message || "Failed to save profile.");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await authService.signOut();
    navigate("/login");
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <p style={{ color: "#94a3b8", fontSize: "14px" }}>Loading profile...</p>
      </div>
    );
  }

  const reviewUrl = slug ? `${window.location.origin}/review/${slug}` : "";
  const publicProfileUrl = slug ? `${window.location.origin}/trust/${slug}` : "";

  const approvedCount = reviews.filter((r) => r.is_approved).length;
  const pendingCount = reviews.filter((r) => !r.is_approved).length;

  return (
    <div style={styles.pageContainer}>
      <header style={styles.header}>
        <div style={styles.brandGroup}>
          <div style={styles.logoBadge}>T</div>
          <span style={styles.brandName}>Trustora</span>
        </div>
        <div style={styles.headerRight}>
          <span style={styles.userEmail}>{user?.email}</span>
          <button onClick={handleLogout} style={styles.logoutBtn}>
            Sign Out
          </button>
        </div>
      </header>

      <main style={styles.main}>
        {successMsg && <div style={styles.successBox}>{successMsg}</div>}
        {errorMsg && <div style={styles.errorBox}>{errorMsg}</div>}

        <div style={styles.dashboardGrid}>
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Business Profile</h2>
            <form onSubmit={handleSaveBusiness}>
              <div style={styles.fieldGroup}>
                <label style={styles.label}>Business Name</label>
                <input
                  type="text"
                  required
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g. Iron House Gym / Elite Salon"
                  style={styles.input}
                />
              </div>

              <div style={styles.fieldGroup}>
                <label style={styles.label}>Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={styles.input}
                >
                  <option value="Fitness & Health Center">Gym / Fitness Center</option>
                  <option value="Salon & Spa">Salon & Spa</option>
                  <option value="Cafe & Restaurant">Cafe / Restaurant</option>
                  <option value="Healthcare & Clinic">Clinic / Doctor</option>
                  <option value="Automobile & Services">Automobile / Garage</option>
                  <option value="Retail & Boutique">Retail / Boutique</option>
                  <option value="Other Professional Services">Other Services</option>
                </select>
              </div>

              <div style={styles.fieldGroup}>
                <label style={styles.label}>Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Short description of your services"
                  style={{ ...styles.input, resize: "none" }}
                />
              </div>

              <div style={styles.fieldGroup}>
                <label style={styles.label}>Custom URL Slug</label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="e.g. elite-salon"
                  style={styles.input}
                />
              </div>

              <button type="submit" disabled={saving} style={styles.primaryBtn}>
                {saving ? "Saving..." : "Save Profile"}
              </button>
            </form>
          </div>

          <div style={styles.card}>
            <h2 style={styles.cardTitle}>QR Code & Share Link</h2>
            {slug ? (
              <div>
                <QRCodeDisplay reviewUrl={reviewUrl} />
                <div style={styles.linksBox}>
                  <p style={styles.linkTitle}>Public Link:</p>
                  <a href={publicProfileUrl} target="_blank" rel="noreferrer" style={styles.linkText}>
                    {publicProfileUrl} ↗
                  </a>
                </div>
              </div>
            ) : (
              <p style={{ color: "#94a3b8", fontSize: "14px", textAlign: "center", marginTop: "40px" }}>
                Save your profile details to generate your QR code.
              </p>
            )}
          </div>
        </div>

        {slug && (
          <div style={styles.reviewsManagerCard}>
            <div style={styles.managerHeader}>
              <h2 style={styles.cardTitle}>Customer Reviews ({reviews.length})</h2>
              <div style={styles.statsRow}>
                <span style={styles.statChipActive}>{approvedCount} Public</span>
                <span style={styles.statChipHidden}>{pendingCount} Hidden</span>
              </div>
            </div>

            {reviews.length === 0 ? (
              <p style={{ color: "#94a3b8", fontSize: "14px", margin: 0 }}>No reviews received yet.</p>
            ) : (
              <div style={styles.reviewGrid}>
                {reviews.map((rev) => (
                  <div
                    key={rev.id}
                    style={{
                      ...styles.moderationCard,
                      borderColor: rev.is_approved ? "rgba(34, 197, 94, 0.3)" : "rgba(239, 68, 68, 0.3)",
                    }}
                  >
                    <div style={styles.modCardHeader}>
                      <div>
                        <span style={styles.reviewerName}>{rev.reviewer_name}</span>
                        <span style={styles.stars}> {"★".repeat(rev.rating)}</span>
                      </div>

                      <div style={{ display: "flex", gap: "8px" }}>
                        <button
                          onClick={() => handleToggleApproval(rev.id, rev.is_approved)}
                          style={{
                            ...styles.toggleBtn,
                            backgroundColor: rev.is_approved ? "rgba(34, 197, 94, 0.15)" : "rgba(239, 68, 68, 0.15)",
                            color: rev.is_approved ? "#4ade80" : "#fca5a5",
                            border: rev.is_approved ? "1px solid #22c55e" : "1px solid #ef4444",
                          }}
                        >
                          {rev.is_approved ? "✓ Public" : "✕ Hidden"}
                        </button>

                        <button
                          onClick={() => handleDeleteReview(rev.id)}
                          style={styles.deleteBtn}
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    <p style={styles.modReviewText}>"{rev.review_text}"</p>
                    <span style={styles.modDate}>
                      {new Date(rev.created_at).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <LegalNotice />
      </main>
    </div>
  );
}

const styles = {
  pageContainer: { minHeight: "100vh", backgroundColor: "#090d16", color: "#ffffff", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" },
  loadingContainer: { minHeight: "100vh", backgroundColor: "#090d16", display: "flex", justifyContent: "center", alignItems: "center" },
  header: { height: "64px", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #1e293b", backgroundColor: "#090d16" },
  brandGroup: { display: "flex", alignItems: "center", gap: "10px" },
  logoBadge: { width: "32px", height: "32px", backgroundColor: "#22c55e", color: "#090d16", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "16px" },
  brandName: { fontSize: "18px", fontWeight: "700" },
  headerRight: { display: "flex", alignItems: "center", gap: "16px" },
  userEmail: { fontSize: "13px", color: "#94a3b8" },
  logoutBtn: { padding: "6px 14px", backgroundColor: "rgba(239, 68, 68, 0.1)", color: "#fca5a5", border: "1px solid rgba(239, 68, 68, 0.2)", borderRadius: "8px", fontSize: "12px", fontWeight: "600", cursor: "pointer" },
  main: { maxWidth: "960px", margin: "32px auto", padding: "0 20px" },
  successBox: { backgroundColor: "rgba(34, 197, 94, 0.1)", color: "#4ade80", padding: "12px 16px", borderRadius: "10px", fontSize: "13px", marginBottom: "20px", border: "1px solid #22c55e" },
  errorBox: { backgroundColor: "rgba(239, 68, 68, 0.1)", color: "#fca5a5", padding: "12px 16px", borderRadius: "10px", fontSize: "13px", marginBottom: "20px", border: "1px solid #ef4444" },
  dashboardGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "20px" },
  card: { backgroundColor: "#131d31", padding: "28px", borderRadius: "16px", border: "1px solid #1e293b" },
  cardTitle: { fontSize: "18px", fontWeight: "700", margin: "0 0 20px 0", color: "#ffffff" },
  fieldGroup: { marginBottom: "16px" },
  label: { display: "block", fontSize: "12px", color: "#94a3b8", fontWeight: "600", marginBottom: "6px" },
  input: { width: "100%", padding: "11px 14px", borderRadius: "10px", border: "1px solid #334155", backgroundColor: "#090d16", color: "#ffffff", fontSize: "14px", boxSizing: "border-box", outline: "none" },
  primaryBtn: { width: "100%", padding: "12px", backgroundColor: "#22c55e", color: "#090d16", border: "none", borderRadius: "10px", fontWeight: "700", fontSize: "14px", cursor: "pointer", marginTop: "8px" },
  linksBox: { marginTop: "16px", padding: "12px", backgroundColor: "#090d16", borderRadius: "10px", border: "1px solid #1e293b" },
  linkTitle: { fontSize: "11px", color: "#94a3b8", margin: "0 0 4px 0", fontWeight: "600" },
  linkText: { fontSize: "13px", color: "#38bdf8", textDecoration: "none", wordBreak: "break-all" },
  reviewsManagerCard: { marginTop: "24px", backgroundColor: "#131d31", padding: "28px", borderRadius: "16px", border: "1px solid #1e293b" },
  managerHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" },
  statsRow: { display: "flex", gap: "8px" },
  statChipActive: { fontSize: "12px", color: "#4ade80", backgroundColor: "rgba(34, 197, 94, 0.1)", padding: "4px 10px", borderRadius: "20px", fontWeight: "600" },
  statChipHidden: { fontSize: "12px", color: "#fca5a5", backgroundColor: "rgba(239, 68, 68, 0.1)", padding: "4px 10px", borderRadius: "20px", fontWeight: "600" },
  reviewGrid: { display: "flex", flexDirection: "column", gap: "12px" },
  moderationCard: { backgroundColor: "#090d16", padding: "16px", borderRadius: "12px", border: "1px solid #1e293b" },
  modCardHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" },
  stars: { color: "#f59e0b", fontSize: "13px" },
  toggleBtn: { padding: "5px 12px", borderRadius: "6px", fontSize: "12px", fontWeight: "700", cursor: "pointer" },
  deleteBtn: { padding: "5px 10px", backgroundColor: "rgba(239, 68, 68, 0.1)", color: "#fca5a5", border: "1px solid rgba(239, 68, 68, 0.2)", borderRadius: "6px", fontSize: "12px", fontWeight: "700", cursor: "pointer" },
  modReviewText: { fontSize: "13px", color: "#cbd5e1", margin: "0 0 8px 0" },
  modDate: { fontSize: "11px", color: "#64748b" }
};
const handleSaveBusiness = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const generatedSlug = slug || businessName.toLowerCase().replace(/[^a-z0-9]+/g, "-");

      const businessData = {
        owner_id: user.id,
        email: user.email, // 👈 इथे युजरचा ईमेल पास होतोय
        name: businessName,
        category,
        description,
        slug: generatedSlug,
      };

      const savedBiz = await businessService.createBusiness(businessData);
      setBusinessName(savedBiz.name || "");
      setCategory(savedBiz.category || "");
      setDescription(savedBiz.description || "");
      setSlug(savedBiz.slug || "");
      
      setSuccessMsg("Profile saved successfully!");
      fetchReviews(savedBiz.id);
    } catch (err) {
      console.error("Save error:", err);
      setErrorMsg(err.message || "Failed to save profile.");
    } finally {
      setSaving(false);
    }
  };