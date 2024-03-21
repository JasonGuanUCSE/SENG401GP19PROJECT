import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import React from 'react';

import LoginSignup from "./Components/LoginSignup";
import HomePage from "./HomePage";

function App() {

  return(
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          {<Route path="/login" element={<LoginSignup/>}/>}
        </Routes>
      </Router>
    </>
  );
}

export default App;
