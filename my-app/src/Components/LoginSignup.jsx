import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import "./LoginSignup.css";

import logo from "../../Assets/Instacart.png";

const LoginSignup = () => {
  const handleLogin = (response) => {
    console.log(response);
  };

  const handleFailure = (response) => {
    console.log(response);
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
          <div className="text">Log in</div>
          <div className="underline"></div>
        </div>
        <div className="google-button">
          <GoogleLogin
            clientId="344567969650-424nh7e03gtv01cmu61htq2gcar93k46.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={handleLogin}
            onFailure={handleFailure}
            cookiePolicy={"single_host_origin"}
          />
        </div>
        <div className="seperator">
          <div className="or-text">
            <span className="line"></span>
            or
            <span className="line"></span>
          </div>
        </div>
        <div className="inputs">
          <div className="input">
            <input type="text" placeholder="Email" />
          </div>
          <div className="input">
            <input type="password" placeholder="Password" />
          </div>
        </div>
        <div className="forgot-password">
          Forgot your password? <span>Click here!</span>
        </div>
        <div className="submit-container">
          <div className="submit">Login</div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
