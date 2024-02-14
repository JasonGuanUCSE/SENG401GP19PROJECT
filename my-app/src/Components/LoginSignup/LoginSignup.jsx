import React from 'react';
import './LoginSignup.css';

import logo from '../../Assets/Instacart.png';

const LoginSignup = () => {
  return (
    <div className='container'>
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
          <button class='login-google'>
            Continue with Google
          </button>
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
        <div className="forgot-password">Forgot your password? <span>Click here!</span></div>
        <div className="submit-container">
          <div className="submit">Login</div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
