import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// सर्व लाईव्ह पेजेस इम्पोर्ट करत आहोत
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PublicProfile from "./pages/PublicProfile";
import SubmitReview from "./pages/SubmitReview";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* 1. लँडिंग पेज */}
        <Route path="/" element={<Landing />} />

        {/* 2. ऑथेंटिकेशन पेजेस (Signup & Login) */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* 3. डॅशबोर्ड पेज (Business Owner Control Center) */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* 4. पब्लिक प्रोफाईल पेज (उदा. /trust/iron-house-gym) */}
        <Route path="/trust/:slug" element={<PublicProfile />} />

        {/* 5. रिव्ह्यू सबमिट करण्याचे पेज (उदा. /review/iron-house-gym) */}
        <Route path="/review/:slug" element={<SubmitReview />} />
      </Routes>
    </Router>
  );
}