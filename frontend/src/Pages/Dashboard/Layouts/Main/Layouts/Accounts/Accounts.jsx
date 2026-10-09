import React from "react";
import "./Account.css";
import {useAuth} from "../../../../../../Auth/AuthContext";

const Account = () => {
  const { user } = useAuth();

  return (
    <div className="account-page">
      {/* Profile Overview */}
      <section className="account-section">
        <h2>Profile Overview</h2>
        <div className="account-card profile-card">
          <div className="profile-header">
            <img
              src="/default-avatar.png"
              alt="Profile"
              className="profile-avatar"
            />
            <div>
              <h3>{user.name}</h3>
              <p>SoftNet ID: SN-2048-5581</p>
              <p>Email:  {user.email}</p>
              <p>Phone: not yet setup</p>
            </div>
          </div>
          <button className="btn">Edit Profile</button>
        </div>
      </section>

      {/* Security & Sign-In */}
      <section className="account-section">
        <h2>Security & Sign-In</h2>
        <div className="account-grid">
          <div className="account-card">
            <h3>Password Management</h3>
            <p>Last updated: 3 months ago</p>
            <button className="btn-secondary">Change Password</button>
          </div>
          <div className="account-card">
            <h3>Two-Factor Authentication</h3>
            <p>Status: Enabled (Authenticator App)</p>
            <button className="btn-secondary">Manage 2FA</button>
          </div>
          <div className="account-card">
            <h3>Recent Login Activity</h3>
            <ul className="activity-list">
              <li>Linux - Nairobi, KE - Aug 10, 2025</li>
              <li>Windows - Mombasa, KE - Aug 8, 2025</li>
            </ul>
            <button className="btn">View All</button>
          </div>
        </div>
      </section>

      {/* Linked Services */}
      <section className="account-section">
        <h2>Linked Services</h2>
        <div className="account-grid">
          {[
            { name: "SoftNet Cloud", status: "Active" },
            { name: "SoftNet AI Suite", status: "Inactive" },
            { name: "SoftNet SecureDrive", status: "Active" },
            { name: "SoftNet Mail", status: "Active" },
          ].map((service, index) => (
            <div className="account-card" key={index}>
              <h3>{service.name}</h3>
              <p>Status: {service.status}</p>
              <button className="btn-secondary">Manage</button>
            </div>
          ))}
        </div>
      </section>

      {/* Billing & Subscriptions */}
      <section className="account-section">
        <h2>Billing & Subscriptions</h2>
        <div className="account-card">
          <p>Current Plan: <strong>Pro</strong></p>
          <p>Next Billing Date: Sep 12, 2025</p>
          <button className="btn-secondary">Manage Billing</button>
        </div>
      </section>

      {/* Privacy & Data Control */}
      <section className="account-section">
        <h2>Privacy & Data Control</h2>
        <div className="account-grid">
          <div className="account-card">
            <h3>Permission Management</h3>
            <p>Control app/service data access</p>
            <button className="btn-secondary">Manage Permissions</button>
          </div>
          <div className="account-card">
            <h3>Data Export</h3>
            <p>Download your account data</p>
            <button className="btn-secondary">Export Data</button>
          </div>
          <div className="account-card">
            <h3>Delete Account</h3>
            <p>Close account and erase data</p>
            <button className="btn-danger">Delete Account</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Account;
