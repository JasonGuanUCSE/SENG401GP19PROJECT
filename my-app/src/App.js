import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Store from "./stores/Store";
import CheckoutPage from "./Components/Checkoutpage";
import LoginSignup from "./Components/LoginSignup";

import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [data, setData] = useState("");
  const [order, setOrder] = useState([]);
  const [currentStore, setCurrentStore] = useState("HomePage");
  const [previousStore, setPreviousStore] = useState(""); //To go back to from checkout to store
  //fetch data from https://seng401jstacartread.onrender.com/api/Jstacart/products
  // Function to fetch products data
  async function fetchProductsData(productId = "") {
    try {
      // Construct the URL based on the productId parameter
      const url = productId
        ? `https://seng401jstacartread.onrender.com/api/Jstacart/products/${productId}`
        : "https://seng401jstacartread.onrender.com/api/Jstacart/products";

      // Fetch data from the URL
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Check if the response is successful
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      // Parse the JSON response
      const productsData = await response.json();

      // Return the data
      return productsData;
    } catch (error) {
      console.error("Error fetching products data:", error);
      return null;
    }
  }

  // Example usage:
  // Fetch all products
  fetchProductsData()
    .then((products) => {
      console.log("All products:");
      console.log(products);
    })
    .catch((error) => console.error("Error:", error));

  // Fetch product by ID
  const productId = "your_product_id_here";
  fetchProductsData(productId)
    .then((product) => {
      console.log("Product:");
      console.log(product);
    })
    .catch((error) => console.error("Error:", error));

  const handleSwitchStore = (storeName) => {
    setCurrentStore(storeName);
  };

  const handleLoginSuccess = (response) => {
    setUser({
      profile: response.profile,
    });
    console.log("User logged in successfully");
    console.log(response);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <>
      {user ? (
        <>
          {currentStore === "HomePage" && currentStore !== "CheckoutPage" && (
            <>
              <div>Top</div>
              <div>{}</div>
              <div className="navBar">
                <button className="logoIcon">Jstacart</button>

                {/* <SearchBar /> */}

                <button className="navBarButtons">Orders</button>

                <button className="navBarButtons">Cart</button>

                <button className="navBarButtons">Profile</button>
              </div>
              <div className="mainPage">
                <div className="banner">
                  <div className="bannerContent">
                    <h3>Free delivery over $20</h3>
                    <h1>Become a member</h1>
                    <p>Get your groceries delivered to your doorstep</p>
                    <button className="shopNowButton">Shop Now!</button>
                  </div>
                </div>
                <div className="stores">
                  <div className="storeSectionHome">
                    <img src="https://assets-global.website-files.com/64248e7fd5f30d79c9e57d64/64e6177329c2d71389b1b219_walmart.png"></img>
                    <button
                      className="storeButtonsHome"
                      id="Walmart"
                      onClick={() => handleSwitchStore("Walmart")}
                    >
                      Walmart
                    </button>
                  </div>
                  <div className="storeSectionHome">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Costco_Wholesale_logo_2010-10-26.svg/800px-Costco_Wholesale_logo_2010-10-26.svg.png"></img>
                    <button
                      className="storeButtonsHome"
                      id="Costco"
                      onClick={() => handleSwitchStore("Costco")}
                    >
                      Costco
                    </button>
                  </div>
                  <div className="storeSectionHome">
                    <img src="https://www.instacart.com/assets/domains/store_configuration/logo/1007/white_label_landing_page_556ecd01-f795-4043-98e7-ad10da94ef05.png"></img>
                    <button
                      className="storeButtonsHome"
                      id="SuperStore"
                      onClick={() => handleSwitchStore("SuperStore")}
                    >
                      SuperStore
                    </button>
                  </div>
                  <div className="storeSectionHome">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/T%26T_Supermarket_Logo.svg/2560px-T%26T_Supermarket_Logo.svg.png"></img>
                    <button
                      className="storeButtonsHome"
                      id="TT"
                      onClick={() => handleSwitchStore("TandT")}
                    >
                      T&T SuperMarket
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
          {currentStore !== null &&
            currentStore !== "HomePage" &&
            currentStore !== "CheckoutPage" && (
              <Store
                store={currentStore}
                id={1}
                setCurrentStore={setCurrentStore}
                setPreviousStore={setPreviousStore}
                order={order}
                setOrder={setOrder}
              />
            )}
          {currentStore == "CheckoutPage" && currentStore !== "HomePage" && (
            <CheckoutPage
              setCurrentStore={setCurrentStore}
              previousStore={previousStore}
              order={order}
              setOrder={setOrder}
            />
          )}
        </>
      ) : (
        <LoginSignup handleLoginSuccess={handleLoginSuccess} />
      )}
    </>
  );
}

export default App;
