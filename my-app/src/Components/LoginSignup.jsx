import React, { useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

import logo from "../Assets/Instacart.png";
import "./LoginSignup.css";

const LoginSignup = ({ setUser }) => {
  const [res, setRes] = useState(
    JSON.parse(localStorage.getItem("res")) || null
  );
  const [profile, setProfile] = useState(
    JSON.parse(localStorage.getItem("profile")) || null
  );

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setRes(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (profile) {
      localStorage.setItem("res", JSON.stringify(res));
      localStorage.setItem("profile", JSON.stringify(profile));
      setUser(profile);
      console.log("User:", res);
    }
  }, [profile]);

  useEffect(() => {
    if (res) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${res.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${res.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((response) => {
          setProfile(response.data);
          console.log(response.data);
        })
        .catch((err) => console.log(err));
    }
  }, [res]);

  return (
    <div className="container">
      <div className="header-bar">
        <a>
          <img src={logo} alt="logo" />
        </a>
      </div>
      <div className="row">
        <div className="signup-container">
          <div className="header">
            <div className="text">
              <h1>Welcome to Jstacart</h1>
            </div>
          </div>
          <div className="google-button">
            <button onClick={login}>Sign in with Google</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
