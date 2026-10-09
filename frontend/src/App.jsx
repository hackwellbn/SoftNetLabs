import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Home from "./Pages/Home/Home";
import Contact from "./Pages/Contacts/Contacts";
import Partners from './Pages/Partners/Partners'
import SoftNetID from './Pages/SoftNetID/SoftNetID';
import Footer from "./Components/Footer/Footer";
import GravityPileNotFound from './Components/404/404';
import Register from "./Auth/Register/Register";
import Login from "./Auth/Login/Login";
import './App.css';
import './Pages/Home/SoftNetHome.css';
import Dashboard from './Pages/Dashboard/Dashboard';
import {AuthContextProvider}  from './Auth/AuthContext';
import Account from './Pages/Dashboard/Layouts/Main/Layouts/Accounts/Accounts'
import AccessControl from './Pages/Dashboard/Layouts/Main/Layouts/AccessControl/AccessControl'
import MyWallet from './Pages/Dashboard/Layouts/Main/Layouts/MyWallet/MyWallet'
import PostOrders from './Pages/Dashboard/Layouts/Main/Layouts/PostOrders/PostOrders'
import Services from './Pages/Dashboard/Layouts/Main/Layouts/Services/Services'
import YourInfo from './Pages/Dashboard/Layouts/Main/Layouts/YourInfo/YourInfo'
import Privacy from './Pages/Dashboard/Layouts/Main/Layouts/Privacy/Privacy'
import PrivateRoute from './Auth/PrivateRoutes';
// Pages
function About() {
  return (
    <div className="sn-home" style={{ padding: "64px 0 96px" }}>
      <div className="wrap">
        <h1 style={{ maxWidth: 720 }}>open a product. see what you get.</h1>
        <p style={{ maxWidth: 420, marginTop: 24, color: "#000", fontSize: 15 }}>
          Jump straight into NetoraCloud, Netora WISP, PataFast, SoftNet Studios, or Agentica — each
          page speaks for itself.
        </p>
        <a className="btn btn-b" href="/#products" style={{ marginTop: 34, display: "inline-block" }}>
          See the products
        </a>
      </div>
    </div>
  );
}

function App() {
  const location = useLocation();

const hideLayoutRoutes = ['/register', '/login', '/dashboard'];
  const isAuthOrDashboard = hideLayoutRoutes.some((route) =>
    location.pathname.startsWith(route)
  );
  // Any path that isn't a known top-level route is a 404 -> render it full-bleed.
  const isNotFound =
    !isAuthOrDashboard &&
    location.pathname !== '/' &&
    location.pathname !== '/about' &&
    location.pathname !== '/contact' &&
    location.pathname.toLowerCase() !== '/softnetid';
  const shouldHideLayout = isAuthOrDashboard || isNotFound;

  // Reset scroll position on 404 so the page starts at the top.
  useEffect(() => {
    if (isNotFound) window.scrollTo(0, 0);
  }, [location.pathname, isNotFound]);

  return (
    <div className="App">
      <AuthContextProvider>
        {!shouldHideLayout && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/softnetid" element={<SoftNetID />} />

          {/* Auth Routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Dashboard routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="account" element={<Account />} />
            <Route path="access-control" element={<AccessControl />} />
            <Route path="my-wallet" element={<MyWallet />} />
            <Route path="post-orders" element={<PostOrders />} />
            <Route path="services" element={<Services />} />
            <Route path="your-info" element={<YourInfo />} />
            <Route path="privacy" element={<Privacy />} />
           </Route>
        </Route>

          {/* Not found — catch-all for any route that doesn't resolve */}
          <Route path="*" element={<GravityPileNotFound />} />

         </Routes>
        {!shouldHideLayout && <Footer />}
      </AuthContextProvider>
    </div>
  );
}

export default App;
