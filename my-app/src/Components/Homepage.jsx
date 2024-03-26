import { googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

import "./Homepage.css";
import { useEffect } from "react";

function Homepage({
  navigate,
  user,
  setUser,
  order,
  setOrder,
  currentStore,
  setCurrentStore,
  previousStore,
  setPreviousStore,
  viewOrder,
  setViewOrder,
}) {
  // Function to fetch products data
  //fetch data from https://seng401jstacartread.onrender.com/api/Jstacart/products
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
    navigate(`/${storeName}`);
  };

  const handleLogout = () => {
    googleLogout();
    setUser(null);
  };

  const handleViewOrder = () => {
    //Pop up window to view previous orders
    console.log("View Order");
    console.log(viewOrder);
    console.log("End view ORder");
  };

  return (
    <>
      <div>{user.name}</div>
      <div>Top</div>
      <div>{}</div>
      <div className="navBar">
        <button className="logoIcon">Jstacart</button>

        <button className="navBarButtons" onClick={() => handleViewOrder()}>
          Orders
        </button>

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
  );
}

export default Homepage;