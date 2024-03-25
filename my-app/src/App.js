import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Topbar from "./Components/Topbar";
import Homepage from "./Components/Homepage";
import LoginSignup from "./Components/LoginSignup";
import Store from "./stores/Store";
import CheckoutPage from "./Components/Checkoutpage";

import "./App.css";

const App = () => {
  const [user, setUser] = useState(null);
  const [order, setOrder] = useState([]);
  const [currentStore, setCurrentStore] = useState("HomePage");
  const [previousStore, setPreviousStore] = useState("");
  const [viewOrder, setViewOrder] = useState([]);

  const navigate = useNavigate();

  return (
    <div>
      {/* <Topbar /> */}
      <main className="app">
        <Routes>
          {user ? (
            <Route
              path="/"
              element={
                <Homepage
                  navigate={navigate}
                  user={user}
                  setUser={setUser}
                  order={order}
                  setOrder={setOrder}
                  currentStore={currentStore}
                  setCurrentStore={setCurrentStore}
                  previousStore={previousStore}
                  setPreviousStore={setPreviousStore}
                  viewOrder={viewOrder}
                  setViewOrder={setViewOrder}
                />
              }
            />
          ) : (
            <Route path="/" element={<LoginSignup setUser={setUser} />} />
          )}
          <Route
            path="/:curentStore"
            element={
              <Store
                navigate={navigate}
                store={currentStore}
                id={1}
                user={user}
                setCurrentStore={setCurrentStore}
                setPreviousStore={setPreviousStore}
                order={order}
                setOrder={setOrder}
              />
            }
          />
          <Route
            path="checkout"
            element={
              <CheckoutPage
                navigate={navigate}
                setCurrentStore={setCurrentStore}
                previousStore={previousStore}
                order={order}
                setOrder={setOrder}
                user={user}
                setViewOrder={setViewOrder}
                viewOrder={viewOrder}
              />
            }
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;
