import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authService } from "../services/authService"; // authService इम्पोर्ट करा

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      // Supabase द्वारे युजर लॉगिन करणे
      await authService.signIn(email, password);
      
      // यशस्वी लॉगिन झाल्यावर डॅशबोर्डवर जाणे
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error.message);
      setErrorMessage(error.message || "Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.card}>
        <div style={styles.headerGroup}>
          <div style={styles.logoBadge}>T</div>
          <h1 style={styles.title}>Welcome Back</h1>
          <p style={styles.subtitle}>Sign in to manage your trust profile.</p>
        </div>

        {errorMessage && (
          <div style={styles.errorBox}>
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              style={styles.input}
            />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Password</label>
            <div style={styles.inputWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                style={styles.inputWithIcon}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.eyeBtn}
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "16px" }}>
          <span style={{ fontSize: "13px", color: "#94a3b8" }}>Don't have an account? </span>
          <Link to="/signup" style={{ fontSize: "13px", color: "#22c55e", textDecoration: "none", fontWeight: "600" }}>
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    minHeight: "100vh",
    backgroundColor: "#0f172a",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    padding: "20px",
    boxSizing: "border-box",
  },
  card: {
    width: "100%",
    maxWidth: "420px",
    backgroundColor: "#1e293b",
    padding: "40px",
    borderRadius: "16px",
    color: "#ffffff",
    boxShadow: "0 20px 50px rgba(0, 0, 0, 0.4)",
    border: "1px solid #334155",
    boxSizing: "border-box",
  },
  headerGroup: {
    textAlign: "center",
    marginBottom: "24px",
  },
  logoBadge: {
    width: "48px",
    height: "48px",
    margin: "0 auto 12px auto",
    backgroundColor: "#38bdf8",
    color: "#0f172a",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "800",
    fontSize: "22px",
    boxShadow: "0 4px 14px rgba(56, 189, 248, 0.3)",
  },
  title: {
    color: "#38bdf8",
    margin: "0 0 6px 0",
    fontSize: "24px",
    fontWeight: "700",
  },
  subtitle: {
    margin: 0,
    fontSize: "14px",
    color: "#94a3b8",
  },
  errorBox: {
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    border: "1px solid #ef4444",
    color: "#fca5a5",
    padding: "10px 14px",
    borderRadius: "8px",
    fontSize: "13px",
    marginBottom: "16px",
    textAlign: "center",
  },
  fieldGroup: {
    marginBottom: "18px",
  },
  label: {
    display: "block",
    fontSize: "11px",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    color: "#94a3b8",
    marginBottom: "6px",
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "8px",
    border: "1px solid #475569",
    backgroundColor: "#0f172a",
    color: "#ffffff",
    fontSize: "14px",
    boxSizing: "border-box",
    outline: "none",
  },
  inputWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  inputWithIcon: {
    width: "100%",
    padding: "12px 42px 12px 14px",
    borderRadius: "8px",
    border: "1px solid #475569",
    backgroundColor: "#0f172a",
    color: "#ffffff",
    fontSize: "14px",
    boxSizing: "border-box",
    outline: "none",
  },
  eyeBtn: {
    position: "absolute",
    right: "12px",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#94a3b8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "4px",
  },
  button: {
    width: "100%",
    marginTop: "10px",
    padding: "13px",
    backgroundColor: "#38bdf8",
    color: "#0f172a",
    border: "none",
    borderRadius: "8px",
    fontWeight: "700",
    fontSize: "14px",
    cursor: "pointer",
    boxShadow: "0 4px 14px rgba(56, 189, 248, 0.25)",
  },
};