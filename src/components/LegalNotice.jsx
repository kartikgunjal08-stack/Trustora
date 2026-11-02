import React, { useState } from "react";

export default function LegalNotice() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("disclaimer"); // 'disclaimer' or 'privacy'

  return (
    <div style={styles.footerContainer}>
      <p style={styles.footerText}>
        © {new Date().getFullYear()} Trustora Engine. Verified Reputation Management.
      </p>
      <div style={styles.linkGroup}>
        <button onClick={() => { setActiveTab("disclaimer"); setIsOpen(true); }} style={styles.linkBtn}>
          Business & Audience Disclaimer
        </button>
        <span style={styles.dot}>•</span>
        <button onClick={() => { setActiveTab("privacy"); setIsOpen(true); }} style={styles.linkBtn}>
          Privacy Policy
        </button>
      </div>

      {/* POPUP MODAL */}
      {isOpen && (
        <div style={styles.overlay} onClick={() => setIsOpen(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <div style={styles.tabButtons}>
                <button
                  onClick={() => setActiveTab("disclaimer")}
                  style={{
                    ...styles.tabBtn,
                    borderBottom: activeTab === "disclaimer" ? "2px solid #22c55e" : "none",
                    color: activeTab === "disclaimer" ? "#4ade80" : "#94a3b8",
                  }}
                >
                  Legal Disclaimer
                </button>
                <button
                  onClick={() => setActiveTab("privacy")}
                  style={{
                    ...styles.tabBtn,
                    borderBottom: activeTab === "privacy" ? "2px solid #22c55e" : "none",
                    color: activeTab === "privacy" ? "#4ade80" : "#94a3b8",
                  }}
                >
                  Privacy Policy
                </button>
              </div>
              <button onClick={() => setIsOpen(false)} style={styles.closeBtn}>✕</button>
            </div>

            <div style={styles.modalBody}>
              {activeTab === "disclaimer" ? (
                <div>
                  <h3 style={styles.sectionTitle}>1. Business Owner Terms & Disclaimer</h3>
                  <p style={styles.paragraph}>
                    Trustora provides a review routing and collection infrastructure for registered businesses. 
                    Business owners are fully responsible for managing member communications, addressing grievances, 
                    and ensuring fair moderation practices on their dashboard. Trustora is not liable for indirect damages, 
                    business loss, or disputes arising from unmoderated member feedback.
                  </p>

                  <h3 style={styles.sectionTitle}>2. Audience & Reviewer Disclaimer</h3>
                  <p style={styles.paragraph}>
                    By submitting a review via Trustora QR or web links, you certify that your feedback represents 
                    a genuine personal experience with the business. Fake reviews, offensive language, or promotional spam 
                    are strictly prohibited and subject to immediate deletion by platform administrators or business owners.
                  </p>
                </div>
              ) : (
                <div>
                  <h3 style={styles.sectionTitle}>1. Data Collection</h3>
                  <p style={styles.paragraph}>
                    We respect your privacy. We collect minimal required information including business credentials (for owners) 
                    and reviewer names/ratings (for members). We do NOT sell, rent, or trade personal identity data to third-party advertisers.
                  </p>

                  <h3 style={styles.sectionTitle}>2. Review Moderation & Storage</h3>
                  <p style={styles.paragraph}>
                    High-satisfaction ratings (4-5 stars) are published automatically to build verified brand trust. 
                    Constructive ratings (1-3 stars) are routed privately to the business owner dashboard to allow internal issue resolution.
                  </p>

                  <h3 style={styles.sectionTitle}>3. Security</h3>
                  <p style={styles.paragraph}>
                    All profile configurations and review data are encrypted in transit and securely hosted via Supabase cloud architecture with strict Row Level Security (RLS) standards.
                  </p>
                </div>
              )}
            </div>

            <div style={styles.modalFooter}>
              <button onClick={() => setIsOpen(false)} style={styles.primaryCloseBtn}>
                Got it, Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  footerContainer: {
    marginTop: "40px",
    paddingTop: "20px",
    borderTop: "1px solid #1e293b",
    textAlign: "center",
  },
  footerText: {
    fontSize: "12px",
    color: "#64748b",
    margin: "0 0 6px 0",
  },
  linkGroup: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
  },
  linkBtn: {
    background: "none",
    border: "none",
    color: "#38bdf8",
    fontSize: "12px",
    fontWeight: "600",
    cursor: "pointer",
    padding: 0,
  },
  dot: {
    color: "#475569",
    fontSize: "12px",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    backdropFilter: "blur(4px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
    padding: "20px",
  },
  modal: {
    backgroundColor: "#131d31",
    border: "1px solid #1e293b",
    borderRadius: "20px",
    width: "100%",
    maxWidth: "520px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
    overflow: "hidden",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 20px 0 20px",
    borderBottom: "1px solid #1e293b",
  },
  tabButtons: {
    display: "flex",
    gap: "16px",
  },
  tabBtn: {
    background: "none",
    border: "none",
    padding: "8px 4px 12px 4px",
    fontSize: "13px",
    fontWeight: "700",
    cursor: "pointer",
  },
  closeBtn: {
    background: "none",
    border: "none",
    color: "#94a3b8",
    fontSize: "16px",
    cursor: "pointer",
    padding: "4px",
  },
  modalBody: {
    padding: "20px",
    maxHeight: "360px",
    overflowY: "auto",
    textAlign: "left",
  },
  sectionTitle: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#f8fafc",
    margin: "0 0 6px 0",
  },
  paragraph: {
    fontSize: "13px",
    color: "#94a3b8",
    lineHeight: "1.6",
    margin: "0 0 16px 0",
  },
  modalFooter: {
    padding: "14px 20px",
    borderTop: "1px solid #1e293b",
    backgroundColor: "#090d16",
    textAlign: "right",
  },
  primaryCloseBtn: {
    padding: "8px 18px",
    backgroundColor: "#22c55e",
    color: "#090d16",
    border: "none",
    borderRadius: "8px",
    fontWeight: "700",
    fontSize: "13px",
    cursor: "pointer",
  },
};