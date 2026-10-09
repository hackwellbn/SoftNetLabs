import React, { useState, useRef, useEffect } from 'react';
import './Topbar.css';
import { useAuth } from '../../../../Auth/AuthContext';
import { Bell } from 'lucide-react';
import { Menu } from 'lucide-react';

const Topbar = ({toggleSidebar}) => {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const menuRef = useRef();

  const getUsernameColor = (name) => {
    if (!name) return "#4B5563"; // fallback gray
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = (hash & 0x00FFFFFF).toString(16).toUpperCase().padStart(6, '0');
    return `#${color}`;
  };

  const toggleMenu = () => setShowUserMenu(prev => !prev);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="topbar">
      <div className="topbar-left">
        <span className="menu-icon" onClick={toggleSidebar}><Menu size={24}/></span>
        <span className="app-name">SoftNet</span>
      </div>

      <div className="topbar-right">
        <button className="notification" aria-label="Notifications">
          <Bell className="bell" />
        </button>

        <div className="user-info" ref={menuRef}>
          <div className="user-meta">
            <span
              className="username"
              style={{ backgroundColor: getUsernameColor(user?.name) }}
              onClick={toggleMenu}
            >
              {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
            </span>

            {showUserMenu && (
              <div className="modal-username">
                <span className="modal-name">{user?.name}</span>
                <span className="modal-email">{user?.email}</span>
                <button className="logout-btn" onClick={logout}>Logout</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;