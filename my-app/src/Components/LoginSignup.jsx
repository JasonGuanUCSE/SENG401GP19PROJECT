import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";

import logo from "../Assets/Instacart.png";
import "./LoginSignup.css";

const LoginSignup = ({ handleLoginSuccess }) => {
  const handleFailure = (response) => {
    console.log("Google login failed", response);
  };

  return (
    <div className="container">
      <div className="header-bar">
        <a>
          <img src={logo} alt="logo" />
        </a>
      </div>
      <div className="signup-container">
        <div className="header">
          <div className="text">
            <h1>Welcome to Jstacart</h1>
          </div>
        </div>
        <div className="google-button">
          <GoogleLogin
            clientId="344567969650-424nh7e03gtv01cmu61htq2gcar93k46.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={handleLoginSuccess}
            onFailure={handleFailure}
            cookiePolicy={"single_host_origin"}
            flow="auth-code"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;