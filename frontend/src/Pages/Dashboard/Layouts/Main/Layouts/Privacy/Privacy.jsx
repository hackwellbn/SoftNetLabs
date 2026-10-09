import React from "react";
import "./Privacy.css";

const Privacy = () => {
  return (
    <div className="privacy-container">
      <h1 className="privacy-title">Privacy Policy</h1>
      <p className="privacy-updated">Last updated: August 12, 2025</p>

      <section>
        <h2>1. Introduction</h2>
        <p>
          At <strong>SoftNet</strong>, we value your privacy and are committed to
          protecting your personal information. This Privacy Policy explains how we
          collect, use, and safeguard your data.
        </p>
      </section>

      <section>
        <h2>2. Information We Collect</h2>
        <ul>
          <li>Personal identification information (name, email, phone number)</li>
          <li>Usage data and browsing history</li>
          <li>Cookies and tracking technologies</li>
        </ul>
      </section>

      <section>
        <h2>3. How We Use Your Information</h2>
        <p>We use your data to:</p>
        <ul>
          <li>Provide and improve our services</li>
          <li>Communicate with you about updates or promotions</li>
          <li>Ensure platform security and fraud prevention</li>
        </ul>
      </section>

      <section>
        <h2>4. Data Security</h2>
        <p>
          We implement industry-standard security measures to protect your personal
          information from unauthorized access, alteration, or disclosure.
        </p>
      </section>

      <section>
        <h2>5. Your Rights</h2>
        <p>
          You have the right to request access, correction, or deletion of your personal
          data. You may also opt out of certain data processing activities.
        </p>
      </section>

      <section>
        <h2>6. Contact Us</h2>
        <p>
          If you have questions about this Privacy Policy, contact us at{" "}
          <a href="mailto:privacy@softnetkenya.com">privacy@softnetkenya.com</a>.
        </p>
      </section>
    </div>
  );
};

export default Privacy;
