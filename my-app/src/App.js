import "./App.css";
import { Link } from "react-router-dom";
import Store from "./stores/Store";
import CheckoutPage from "./CheckoutPage";
import { useState, useEffect } from "react";
import logo from "./stores/images/Instacart.png";
function App() {
  const [data, setData] = useState("");
  const [order, setOrder] = useState([]);
  const [currentStore, setCurrentStore] = useState("HomePage");
  const [previousStore, setPreviousStore] = useState(""); //To go back to from checkout to store
  const handleSwitchStore = (storeName) => {
    setCurrentStore(storeName);
  };
  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch data from the API
      const response = await fetch(
        "https://seng401jstacartread.onrender.com/api/JstacartW/users"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      // Update the state with the fetched data
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      {currentStore === "HomePage" && currentStore !== "CheckoutPage" && (
        <>
          <div className="navBar">
            {/* <button className="logoIcon">Jstacart</button> */}
            <img src={logo} alt="Logo" className="logo" />

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
  );
}

export default App;
