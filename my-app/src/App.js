import React, { useState, useEffect } from "react";
import Store from "./stores/Store";
import CheckoutPage from "./Components/Checkoutpage";
import LoginSignup from "./Components/LoginSignup";
import { googleLogout } from "@react-oauth/google";
import data_json from "./stores/data/data.json";

import logo from "./icons/jstacart.png";
import orders from "./icons/order.png";
import profile from "./icons/profile.png";
import logout from "./icons/logout.png";

import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [data, setData] = useState(data_json);
  const [eachStoreData, setEachStoreData] = useState([]);
  const [order, setOrder] = useState([]); 
  const [userOrder, setUserOrder] = useState([]); 
  const [currentStore, setCurrentStore] = useState("HomePage");
  const [previousStore, setPreviousStore] = useState("");
  const [viewOrder, setViewOrder] = useState([]);

  useEffect(() => {
    if (user) {
      fetchProductsData()
        .then((products) => {
          console.log("All products:");
          console.log(products);
        })
        .catch((error) => console.error("Error:", error));

      addUser(user)
        .then((newUser) => {
          if (newUser) {
            console.log("User added successfully:", newUser);
          } else {
            console.log("Failed to add user.");
            console.log("User: ", user);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      AllUser().then((users) => {
        console.log("All users:");
        console.log(users);
      });

    }
  }, [user]);
  useEffect(() => {
    console.log("User Orders Updated:", userOrder);
  }, [userOrder]);

  useEffect(() => {
    if (currentStore !== "HomePage" && currentStore !== "CheckoutPage") {
      const filteredData = data.filter((item) =>
        item.store.includes(currentStore)
      );
      console.log("StoreName1: ", filteredData);
      setEachStoreData(filteredData);
    }
  }, [currentStore, data]);

  const fetchProductsData = async () => {
    try {
      const url = "https://seng401gp19project-gbhb.onrender.com/api/Jstacart";

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          collection: "products",
          sender: "web",
          search: "all",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const productsData = await response.json();
      return productsData;
    } catch (error) {
      console.error("Error fetching products data:", error);
      return null;
    }
  };

  const addUser = async (userInfo) => {
    const user_Email_Name = {
      name: userInfo.name,
      email: userInfo.email,
    };

    try {
      const url = "https://seng401gp19project-gbhb.onrender.com/api/Jstacart/";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          collection: "users",
          sender: "web",
        },
        body: JSON.stringify(user_Email_Name),
      });

      if (!response.ok) {
        throw new Error("Failed to add user");
      }

      const newUser = await response.json();
      return newUser;
    } catch (error) {
      console.error("Error adding user:", error);
      return null;
    }
  };

  const AllUser = async () => {
    try {
      const url = "https://seng401gp19project-gbhb.onrender.com/api/Jstacart/";

      const response = await fetch(url, {
        method: "GET",
        headers: {
          collection: "users",
          search: "all",
          sender: "web",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const users = await response.json();
      return users;
    } catch (error) {
      console.error("Error fetching users:", error);
      return null;
    }
  };

  const AllOrder = async () => {
    try {
      const url = "https://seng401gp19project-gbhb.onrender.com/api/Jstacart/";

      const response = await fetch(url, {
        method: "GET",
        headers: {
          collection: "orders",
          search: "all",
          sender: "web",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      const orders = await response.json();
      return orders;
    } catch (error) {
      console.error("Error fetching orders:", error);
      return null;
    }
  };

  const handleSwitchStore = (storeName) => {
    setCurrentStore(storeName);
  };

  const handleLogout = () => {
    localStorage.clear();
    googleLogout();
    setUser(null);
  };

  const handleViewOrder = () => {
    AllOrder().then((orders) => {
      console.log("user email:", user.email);
      console.log("All orders:");
      console.log(orders);
      const currentUserOrders = orders.filter(
        (order) => order.customerEmail === user.email
      );
      console.log("Current user's orders:", currentUserOrders);
      setUserOrder(currentUserOrders);
    });

    let display = "";
    for (let i = 0; i < userOrder.length; i++) {
      display +=
        userOrder[i].productID +
        " " +
        userOrder[i].quantity +
        " " +
        userOrder[i].price +
        " " +
        userOrder[i].store +
        " " +
        userOrder[i].status +
        "\n";
    }
    window.alert(display);
  };

  return (
    <>
      {user ? (
        <>
          {currentStore === "HomePage" && currentStore !== "CheckoutPage" && (
            <>
              <div>{user.name}</div>
              <div>{user.email}</div>
              <div className="navBar">
                <img src={logo} className="logo"/>

                <button
                  className="navBarButtons"
                  onClick={() => handleViewOrder()}>
                  <img src={orders}/>
                  Orders
                </button>

                <button className="navBarButtons">
                  <img src={profile}/>
                  Profile
                </button>

                <button className="navBarButtons" onClick={() => handleLogout("")}>
                  <img src={logout}/>
                  LogOut
                </button>
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
                      onClick={() => handleSwitchStore("Walmart")}>
                      Walmart
                    </button>
                  </div>

                  <div className="storeSectionHome">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Costco_Wholesale_logo_2010-10-26.svg/800px-Costco_Wholesale_logo_2010-10-26.svg.png"></img>
                    <button
                      className="storeButtonsHome"
                      id="Costco"
                      onClick={() => handleSwitchStore("Costco")}>
                      Costco
                    </button>
                  </div>

                  <div className="storeSectionHome">
                    <img src="https://www.instacart.com/assets/domains/store_configuration/logo/1007/white_label_landing_page_556ecd01-f795-4043-98e7-ad10da94ef05.png"></img>
                    <button
                      className="storeButtonsHome"
                      id="SuperStore"
                      onClick={() => handleSwitchStore("SuperStore")}>
                      SuperStore
                    </button>
                  </div>

                  <div className="storeSectionHome">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/T%26T_Supermarket_Logo.svg/2560px-T%26T_Supermarket_Logo.svg.png"></img>
                    <button
                      className="storeButtonsHome"
                      id="TT"
                      onClick={() => handleSwitchStore("TandT")}>
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
                user={user}
                setCurrentStore={setCurrentStore}
                setPreviousStore={setPreviousStore}
                order={order}
                setOrder={setOrder}
                meta_data={data}
                data={eachStoreData}
                setMetaData={setData}
                setData={setEachStoreData}
              />
            )}

          {currentStore == "CheckoutPage" &&
            currentStore !== "HomePage" &&
            user !== null && (
              <CheckoutPage
                setCurrentStore={setCurrentStore}
                previousStore={previousStore}
                order={order}
                setOrder={setOrder}
                user={user}
                setViewOrder={setViewOrder}
                viewOrder={viewOrder}
                currentStore={currentStore}
                setUserOrder={setUserOrder}
              />
            )}
        </>
      ) : (
        <LoginSignup setUser={setUser} />
      )}
    </>
  );
}

export default App;
