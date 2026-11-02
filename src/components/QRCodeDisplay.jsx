import React from "react";
import { QRCodeSVG } from "qrcode.react"; // qrcode.react मधून SVG इम्पोर्ट करा

export default function QRCodeDisplay({ reviewUrl }) {
  if (!reviewUrl) return null;

  return (
    <div style={styles.container}>
      <div style={styles.qrWrapper}>
        {/* एकदम परफेक्ट आणि स्कॅन करण्यायोग्य QR कोड */}
        <QRCodeSVG 
          value={reviewUrl} 
          size={180}
          bgColor={"#ffffff"}
          fgColor={"#0f172a"}
          level={"H"}
          includeMargin={true}
        />
      </div>
      <p style={styles.hintText}>Scan with any phone camera to write a review</p>
      <a 
        href={reviewUrl} 
        target="_blank" 
        rel="noreferrer" 
        style={styles.testLink}
      >
        Test Review Link ↗
      </a>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "10px 0",
  },
  qrWrapper: {
    padding: "14px",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
    display: "inline-block",
    marginBottom: "14px",
  },
  hintText: {
    fontSize: "12px",
    color: "#94a3b8",
    margin: "0 0 10px 0",
    textAlign: "center",
  },
  testLink: {
    fontSize: "13px",
    color: "#38bdf8",
    textDecoration: "none",
    fontWeight: "600",
  },
};