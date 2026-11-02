import React from "react";

export default function Landing() {
  return (
    <div style={styles.pageContainer}>
      {/* 1. NAVBAR */}
      <header style={styles.header}>
        <div style={styles.brandGroup}>
          <div style={styles.logoBadge}>T</div>
          <span style={styles.brandName}>Trustora</span>
        </div>
        <div style={styles.navActions}>
          <a href="/login" style={styles.secondaryBtn}>Sign In</a>
          <a href="/signup" style={styles.primaryBtn}>Get Started Free</a>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <main style={styles.heroSection}>
        <div style={styles.heroContent}>
          <div style={styles.badgeWrapper}>
            <span style={styles.heroBadge}>✨ Customer Trust Identity Platform</span>
          </div>
          <h1 style={styles.heroTitle}>
            Build Verified Trust for <span style={{ color: "#38bdf8" }}>Your Local Business</span>
          </h1>
          <p style={styles.heroSubtitle}>
            Collect real customer experiences, showcase ratings, and share your official public Trust Profile using a simple QR code. Designed specifically for gyms and fitness studios.
          </p>

          <div style={styles.ctaGroup}>
            <a href="/signup" style={styles.heroPrimaryBtn}>
              Create Business Profile →
            </a>
            <a href="/login" style={styles.heroSecondaryBtn}>
              Owner Login
            </a>
          </div>
        </div>

        {/* FEATURE HIGHLIGHT CARDS */}
        <div style={styles.featuresGrid}>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>⭐</div>
            <h3 style={styles.featureTitle}>Review Collection</h3>
            <p style={styles.featureDesc}>
              Let clients scan your QR code and submit authentic ratings and feedback instantly.
            </p>
          </div>

          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>🔗</div>
            <h3 style={styles.featureTitle}>Public Trust Profile</h3>
            <p style={styles.featureDesc}>
              Showcase your business name, category, description, and feedback on a clean shareable URL.
            </p>
          </div>

          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>🔳</div>
            <h3 style={styles.featureTitle}>QR Code Sharing</h3>
            <p style={styles.featureDesc}>
              Generate a custom review link and QR code to display at your front desk or reception.
            </p>
          </div>
        </div>
      </main>

      {/* 3. FOOTER */}
      <footer style={styles.footer}>
        <p style={styles.footerText}>
          © 2026 Trustora. Empowering local business reputation.
        </p>
      </footer>
    </div>
  );
}

const styles = {
  pageContainer: {
    minHeight: "100vh",
    backgroundColor: "#0f172a",
    color: "#ffffff",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
  },
  header: {
    height: "72px",
    padding: "0 40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "1px solid #1e293b",
    backgroundColor: "#0f172a",
    position: "sticky",
    top: 0,
    zIndex: 10,
  },
  brandGroup: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  logoBadge: {
    width: "36px",
    height: "36px",
    backgroundColor: "#38bdf8",
    color: "#0f172a",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "800",
    fontSize: "18px",
    boxShadow: "0 4px 14px rgba(56, 189, 248, 0.3)",
  },
  brandName: {
    fontSize: "20px",
    fontWeight: "700",
    letterSpacing: "-0.5px",
  },
  navActions: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },
  secondaryBtn: {
    padding: "8px 16px",
    backgroundColor: "transparent",
    color: "#cbd5e1",
    textDecoration: "none",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: "600",
  },
  primaryBtn: {
    padding: "9px 18px",
    backgroundColor: "#38bdf8",
    color: "#0f172a",
    textDecoration: "none",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: "700",
    boxShadow: "0 4px 12px rgba(56, 189, 248, 0.2)",
  },
  heroSection: {
    flex: 1,
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "60px 24px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  heroContent: {
    maxWidth: "750px",
    marginBottom: "60px",
  },
  badgeWrapper: {
    marginBottom: "16px",
  },
  heroBadge: {
    backgroundColor: "#1e293b",
    color: "#38bdf8",
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
    border: "1px solid #334155",
  },
  heroTitle: {
    fontSize: "42px",
    fontWeight: "800",
    lineHeight: "1.2",
    margin: "0 0 20px 0",
    letterSpacing: "-1px",
  },
  heroSubtitle: {
    fontSize: "16px",
    color: "#94a3b8",
    lineHeight: "1.6",
    margin: "0 0 32px 0",
  },
  ctaGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "16px",
  },
  heroPrimaryBtn: {
    padding: "13px 24px",
    backgroundColor: "#22c55e",
    color: "#0f172a",
    textDecoration: "none",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "700",
    boxShadow: "0 4px 16px rgba(34, 197, 94, 0.3)",
  },
  heroSecondaryBtn: {
    padding: "13px 24px",
    backgroundColor: "#1e293b",
    color: "#ffffff",
    textDecoration: "none",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "600",
    border: "1px solid #334155",
  },
  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "24px",
    width: "100%",
  },
  featureCard: {
    backgroundColor: "#1e293b",
    padding: "28px",
    borderRadius: "14px",
    border: "1px solid #334155",
    textAlign: "left",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
  },
  featureIcon: {
    fontSize: "24px",
    marginBottom: "14px",
  },
  featureTitle: {
    fontSize: "17px",
    fontWeight: "700",
    margin: "0 0 8px 0",
    color: "#ffffff",
  },
  featureDesc: {
    fontSize: "13px",
    color: "#94a3b8",
    lineHeight: "1.5",
    margin: 0,
  },
  footer: {
    padding: "24px",
    textAlign: "center",
    borderTop: "1px solid #1e293b",
    backgroundColor: "#0f172a",
  },
  footerText: {
    margin: 0,
    fontSize: "12px",
    color: "#64748b",
  },
};