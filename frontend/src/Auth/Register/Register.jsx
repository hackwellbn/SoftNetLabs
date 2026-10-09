import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const IDENTITY_URL = "https://id.softnetkenya.com";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const redirect = encodeURIComponent(window.location.origin + window.location.pathname);
    window.location.href = `${IDENTITY_URL}/signup/email?redirect=${redirect}`;
  }, [navigate]);

  return (
    <div className="content-wrap register">
      <p>Redirecting to SoftNet Identity sign-up...</p>
    </div>
  );
};

export default Register;
