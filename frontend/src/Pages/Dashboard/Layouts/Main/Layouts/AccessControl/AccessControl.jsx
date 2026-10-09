import React from "react";
import "./AccessControl.css";

const AccessControl = () => {
  const activeDevices = [
    { device: "MacBook Pro", location: "Nairobi, KE", lastActive: "Aug 12, 2025", ip: "102.89.25.110" },
    { device: "Windows 10 PC", location: "Mombasa, KE", lastActive: "Aug 10, 2025", ip: "41.89.63.202" },
    { device: "Android Phone", location: "Kisumu, KE", lastActive: "Aug 8, 2025", ip: "197.248.73.54" },
  ];

  const permissions = [
    { app: "SoftNet Mail", access: "Full Access" },
    { app: "SoftNet Cloud", access: "Read & Write" },
    { app: "SoftNet AI Suite", access: "Read Only" },
  ];

  return (
    <div className="access-control-page">
      {/* Active Devices */}
      <section className="ac-section">
        <h2>Active Devices</h2>
        <div className="ac-card">
          <p>These devices are currently signed into your SoftNet account.</p>
          <table className="ac-table">
            <thead>
              <tr>
                <th>Device</th>
                <th>Location</th>
                <th>Last Active</th>
                <th>IP Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {activeDevices.map((d, i) => (
                <tr key={i}>
                  <td>{d.device}</td>
                  <td>{d.location}</td>
                  <td>{d.lastActive}</td>
                  <td>{d.ip}</td>
                  <td>
                    <button className="btn-danger">Sign Out</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn-secondary">Sign Out of All Devices</button>
        </div>
      </section>

      {/* App & Service Permissions */}
      <section className="ac-section">
        <h2>App & Service Permissions</h2>
        <div className="ac-card">
          <p>Manage which SoftNet services and apps have access to your account.</p>
          <table className="ac-table">
            <thead>
              <tr>
                <th>Application</th>
                <th>Access Level</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {permissions.map((p, i) => (
                <tr key={i}>
                  <td>{p.app}</td>
                  <td>{p.access}</td>
                  <td>
                    <button className="btn-secondary">Manage</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn-primary">Add New App Permission</button>
        </div>
      </section>
    </div>
  );
};

export default AccessControl;
