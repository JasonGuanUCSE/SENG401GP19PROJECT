import React from "react";
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App";
import LoginSignup from "./Components/LoginSignup/LoginSignup";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId="344567969650-424nh7e03gtv01cmu61htq2gcar93k46.apps.googleusercontent.com">
    // TODO: Combine the LoginSignup and App components into a single component
    <React.StrictMode>
      <LoginSignup />
    </React.StrictMode>
  </GoogleOAuthProvider>
);
