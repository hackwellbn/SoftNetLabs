import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const IDENTITY_URL = "https://id.softnetkenya.com";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    login();
  }, [login, navigate]);

  return (
    <div className="content-wrap register">
      <p>Redirecting to SoftNet Identity...</p>
    </div>
  );
};

export default Login;
