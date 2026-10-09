// SoftNet navbar — matches softnet(1).html mockup chrome.

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../../Auth/AuthContext";
import SoftNetMark from "../SoftNetMark";
import "./Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, loading, signup, openAccount, logout } = useAuth();

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    document.body.classList.toggle("nav-drawer-open", isOpen);
    return () => document.body.classList.remove("nav-drawer-open");
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const linkItems = (
    <>
      <li>
        <Link to="/#benefits" className="site-navbar-link" onClick={closeMenu}>
          Benefits
        </Link>
      </li>
      <li>
        <Link to="/softnetid" className="site-navbar-link" onClick={closeMenu}>
          SoftNetID
        </Link>
      </li>
      <li>
        <a href="https://about.softnetkenya.com" className="site-navbar-link" onClick={closeMenu}>
          Company
        </a>
      </li>
    </>
  );

  const endItems = (
    <>
      <li>
        <a
          href="https://careers.softnetkenya.com"
          className="site-navbar-careers"
          onClick={closeMenu}
        >
          Careers
        </a>
      </li>
      <li className="site-navbar-cta">
        {loading ? (
          <div className="site-navbar-account-skeleton" aria-label="Loading..." />
        ) : user ? (
          <div className="site-navbar-account-signedin">
            <button
              type="button"
              className="site-navbar-account-chip"
              onClick={() => {
                closeMenu();
                openAccount();
              }}
              title={user.email || user.name || "SoftNet Account"}
              aria-label={`Open SoftNet Account for ${user.name || "you"}`}
            >
              {user.picture ? (
                <img
                  src={user.picture}
                  alt=""
                  className="site-navbar-avatar"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span
                  className="site-navbar-avatar-placeholder"
                  style={{ backgroundColor: user.avatarColor || "#462fd6" }}
                >
                  {(user.name || user.email || "U").charAt(0).toUpperCase()}
                </span>
              )}
              <span className="site-navbar-account-copy">
                <strong>{user.name || "Account"}</strong>
                {user.email ? <small>{user.email}</small> : null}
              </span>
            </button>
            <button
              className="site-navbar-signout"
              onClick={() => {
                logout();
                closeMenu();
              }}
              aria-label="Sign out"
              title="Sign out"
              type="button"
            >
              <FaSignOutAlt />
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="btn btn-k"
            onClick={() => {
              closeMenu();
              signup();
            }}
          >
            Create a SoftNet Account
          </button>
        )}
      </li>
    </>
  );

  return (
    <nav className="site-navbar" role="navigation" aria-label="Main Navigation">
      <div className="site-navbar-wrap">
        <Link to="/" className="site-navbar-logo" aria-label="SoftNet home" onClick={closeMenu}>
          <SoftNetMark className="site-navbar-mark" title="SoftNet" />
          <span className="site-navbar-wordmark">softnet</span>
        </Link>

        <button
          type="button"
          onClick={toggleMenu}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          className="material-symbols-outlined site-navbar-toggle"
        >
          {isOpen ? "close" : "menu"}
        </button>

        <div className="site-navbar-center">
          <ul className="site-navbar-links">{linkItems}</ul>
        </div>

        <ul className="site-navbar-end">{endItems}</ul>
      </div>

      <div className={`site-navbar-drawer ${isOpen ? "is-open" : ""}`}>
        <ul className="site-navbar-links">
          {linkItems}
          <div className="site-navbar-divider" />
          {endItems}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
