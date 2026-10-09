# SoftNet Accounts Center

## Overview
The **SoftNet Accounts Center** is the centralized hub for managing all user-related data, security preferences, linked services, billing, and privacy settings across the SoftNet ecosystem.  
It is inspired by platforms like `account.microsoft.com` but designed with a **SoftNet-first approach**—professional, secure, and highly intuitive.

The **Sidebar Navigation** provides quick access to all core areas:
- **Accounts** (Current Section)
- Services
- Access Control
- Your Info
- Privacy
- My Wallet
- Past Orders

---

## Accounts Section

### 1. Profile Overview
- **Profile Card**
  - User profile picture
  - Full name
  - SoftNet ID (unique identifier)
  - Verified Email & Phone status
  - “Edit Profile” action button
- **Account Health Indicator**
  - Shows overall account security and completion level

---

### 2. Security & Sign-In
- **Password Management**
  - Change password with real-time strength checks
- **Two-Factor Authentication (2FA)**
  - SMS, Email, or Authenticator App support
- **Recent Login Activity**
  - IP address, device type, location, and timestamp
- **Trusted Devices**
  - List of authorized devices with the ability to revoke access
- **Security Alerts**
  - Notifications for suspicious or failed login attempts

---

### 3. Linked Services
- Display all **SoftNet products and services** the account is linked to
  - SoftNet Cloud
  - SoftNet AI Suite
  - SoftNet SecureDrive
  - SoftNet Mail
  - SoftNet DevHub
- **Manage Access**
  - Enable/disable service connections
  - View usage statistics per service

---

### 4. Billing & Subscriptions
- **Current Plan**
  - Shows active subscription tier (Free, Pro, Enterprise)
- **Billing History**
  - Downloadable invoices and receipts
- **Upgrade / Downgrade Plan**
- **Payment Methods**
  - Add/remove credit cards or payment gateways

---

### 5. Activity Dashboard
- **Recent Actions**
  - Log of account-related activities (profile edits, service logins)
- **Service Usage Stats**
  - Storage usage, active sessions, API calls
- **Data Export**
  - Download a copy of account data in compliance with data protection regulations

---

### 6. Privacy & Data Control
- **Permission Management**
  - Control which apps and services have access to personal data
- **Ad Preferences** (if applicable)
  - Opt-in/out of marketing content
- **Account Deletion**
  - Secure process to close account and erase data

---

### 7. Quick Actions
- Sign out of all devices
- Change email or phone
- Reset security questions
- Toggle auto-login feature

---

## Design Principles
- **Professional UI:** Minimalistic, card-based layout for easy navigation
- **Responsive Design:** Optimized for desktop, tablet, and mobile
- **Security First:** Every action requiring sensitive changes prompts verification
- **User Empowerment:** Transparency in data usage and control

---

## Future Enhancements
- Integrate **AI-based security monitoring**
- Add **SoftNet Rewards** section for loyal customers
- Personalized **service recommendations** based on usage patterns



softnet-umbrella/
├─ public/
│  └─ softnet.svg
│
├─ src/
│  ├─ assets/
│  │  ├─ images/
│  │  └─ icons/
│  │
│  ├─ components/
│  │  ├─ layout/
│  │  │  ├─ Navbar.jsx
│  │  │  ├─ Footer.jsx
│  │  │  └─ Layout.jsx
│  │  │
│  │  └─ common/
│  │     ├─ Button.jsx
│  │     └─ Section.jsx
│  │
│  ├─ sections/
│  │  ├─ Hero/
│  │  │  ├─ Hero.jsx
│  │  │  └─ Hero.css
│  │  ├─ Trust/
│  │  ├─ Philosophy/
│  │  ├─ Umbrella/
│  │  ├─ Projects/
│  │  ├─ Process/
│  │  ├─ Tech/
│  │  ├─ Audience/
│  │  ├─ Team/
│  │  ├─ Future/
│  │  └─ CTA/
│  │
│  ├─ pages/
│  │  └─ Home.jsx
│  │
│  ├─ styles/
│  │  ├─ variables.css
│  │  ├─ global.css
│  │  └─ reset.css
│  │
│  ├─ App.jsx
│  └─ main.jsx
│
└─ index.html
