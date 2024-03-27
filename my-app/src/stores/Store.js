import { useState} from "react";
import arrowLeft from "./images/arrow-left.png";
import search from "./images/search.png";
import WalmartLogo from "./images/Walmart.png";
import TandTLogo from "./images/TandT.png";
import CostcoLogo from "./images/Costco.png";
import SuperStoreLogo from "./images/Canadian.png";
import logo from "../icons/jstacart.png";
import cart from "../icons/cart.png";
import orders from "../icons/order.png";
import profile from "../icons/profile.png";

import "./Store.css";
import "../App.css";

function Store({
  store,
  id,
  user,
  setCurrentStore,
  setPreviousStore,
  order,
  setOrder,
  meta_data,
  setMetaData,
  data,
  setData,
}) {

  const [items, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [hideToggle, setHideTggle] = useState("hidden");
  const [visible, setVisible] = useState(false); 
  const [searchTerm, setSearchTerm] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [profileToggle, setProfileToggle] = useState("hidden");

  const storeNames = {
    Walmart: WalmartLogo,
    Costco: CostcoLogo,
    SuperStore: SuperStoreLogo,
    TandT: TandTLogo,
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (event) => {
    setItems([]);
    event.preventDefault();
    setItems(
      data.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const handleGoBack = () => {
    setCurrentStore("HomePage");
    setMetaData(meta_data);
    setOrder([]);
  };

  const handleAdd = (id) => {
    let addingItem = data.find((item) => item.id == parseInt(id));
    addingItem = {
      name: addingItem.name,
      id: addingItem.id,
      quantity: 1,
      price: addingItem.price,
      image: addingItem.image,
    };

    const updateOrder = [...order];

    updateOrder.push(addingItem);
    setOrder(updateOrder);
    console.log("Adding test: ", updateOrder);
    let totalPrice = 0;
    for (const i of updateOrder) {
      totalPrice = totalPrice + i.price * i.quantity;
    }
    setTotalPrice(totalPrice);
    console.log(totalPrice);
  };

  const handleAddQuantity = (id) => {
    const itemIndex = order.findIndex((item) => item.id === id);

    if (itemIndex === -1) return;
    order[itemIndex].quantity += 1;
    setOrder([...order]);
    let totalPrice = 0;

    for (const i of order) {
      totalPrice = totalPrice + i.price * i.quantity;
    }
    setTotalPrice(totalPrice);
  };

  const handleDeleteQuantity = (id) => {
    const itemIndex = order.findIndex((item) => item.id === parseInt(id));
    if (itemIndex === -1) return;

    if (order[itemIndex].quantity > 1) {
      order[itemIndex].quantity -= 1;
    } else if (order[itemIndex].quantity == 1) {
      order.splice(itemIndex, 1);
    }
    setOrder([...order]);
    let totalPrice = 0;

    for (const i of order) {
      totalPrice = totalPrice + i.price * i.quantity;
    }
    setTotalPrice(totalPrice);
  };

  const handleViewOrder = () => {
    if (visible == true) {
      setVisible(false);
      setHideTggle("hidden");
    } else {
      setVisible(true);
      setHideTggle("visible");
    }
  };

  const buttonsCategoriesName = [
    "Dairy&Milk",
    "Vegetables",
    "Fruits",
    "Meat",
    "Beverages",
  ];

  const handleMainContent = (content) => {
    setItems();
    if (content == "Dairy&Milk") {
      // setItems([]);
      // setItems(filterItemsByCategory(data, "dairy"));
      // console.log("Meta: ", data);
      // console.log("Items: ", items);
      filterItemsByCategory(data, "dairy");
    } else if (content === "Vegetables") {
      // setItems([]);
      // setItems(filterItemsByCategory(data, "fresh-produce"));
      filterItemsByCategory(data, "fresh-produce");

    } else if (content === "Fruits") {
      // setItems(filterItemsByCategory(data, "fruits"));
      filterItemsByCategory(data, "fruits");
    } else if (content === "Meat") {
      // setItems(filterItemsByCategory(data, "meat-seafood"));
      filterItemsByCategory(data, "meat-seafood");
    } else if (content === "Beverages") {
      // setItems(filterItemsByCategory(data, "beverages"));
      filterItemsByCategory(data, "beverages");
    }

    console.log("Items: ", items);
  };

  function filterItemsByCategory(dat, cat) {
    const i = dat.filter((item) => item.category.includes(cat));
    //each item in i change i.price to a number
    for (const item of i) {
      const itemPrice = parseFloat(item.price.$numberDecimal);
      item.price = itemPrice;
    }
    console.log("Filtered: ", i);
    setItems(dat.filter((item) => item.category.includes(cat)));
  }

  const handleCheckout = () => {
    setPreviousStore(store);
    setCurrentStore("CheckoutPage");
    console.log("previousStore: ", store);
  };

  const handleViewProfile = () => {
    if (showProfile == true) {
      setShowProfile(false);
      setProfileToggle("hidden");
    } else {
      setShowProfile(true);
      setProfileToggle("visible");
    }
  };

  return (
    <>
      <div className="navBar">
        <img src={logo} alt="Logo" className="logo" />

        <button className="navBarButtons" onClick={handleGoBack}>
          <img src={arrowLeft} alt="arrow" className="button-logo" />
          <span className="button-text">Back</span>
        </button>

        <form onSubmit={handleSubmit} className="searchForm">
          <input
            type="text"
            placeholder="Search for items"
            value={searchTerm}
            onChange={handleChange}
            className="searchInput"
          />

          <button type="submit" className="searchButton">
            <img src={search} alt="search" className="search" />
          </button>
        </form>

        <button className="navBarButtons">
          <img src={orders}/>
          Orders
        </button>

        <button className="navBarButtons" onClick={handleViewOrder}>
          <img src={cart}/>
          Cart
        </button>
          
        <button className="navBarButtons" onClick={handleViewProfile}>
          <img src={profile}/>
          Profile
        </button>

      </div>

      <div className="Store">
        <div className="CartPopup" id={hideToggle}>
          <div className="SubCartExtend">
            <h2>Personal {store} shopping cart</h2>
          </div>

          <ul className="productListCart">
            {order.map((item) => (
              <div className="eachItem">

                <li key={item.id}>
                  <div className="itemName">{item.name}</div>
                  <div className="quantityPrice">
                    <div>quantity: {item.quantity} </div>
                    <div>individual price: ${item.price}</div>
                  </div>
                </li>
                
                <div className="buttonsContainer">
                  <button
                    className="addDelete"
                    onClick={() => handleAddQuantity(item.id)}>
                    Add 1
                  </button>

                  <button
                    className="addDelete"
                    onClick={() => handleDeleteQuantity(item.id)}>
                    Delete 1
                  </button>
                </div>
              </div>
            ))}
          </ul>

          
          <div className="backCheckout">
            The subtotal is ${totalPrice.toFixed(2)}

            <div>
              <button className="backToStore" onClick={handleViewOrder}>
                Back
              </button>

              <button className="checkOut" onClick={handleCheckout}>
                Go to checkout
              </button>
            </div>
          </div>

        </div>

        <div className="profilePopup" id={profileToggle}>

          <img id="profilePic" src={user.picture}/>
          <div id="userName">
            {user.given_name}
          </div>

          <div id="lastName">
            {user.family_name}
          </div>

          <div id="userEmail">
            {user.email}
          </div>
          
          <div className="backCheckout">
            <button className="backToStore" onClick={handleViewProfile}>
              Back
            </button>
          </div>
        </div>

        <div className="main">
          <div className="Side">
            <div className="TopSide">
              <img src={storeNames[store]} alt="Logo" className="StoreLogo" />
              <div>Welcome to {store} online grocery</div>
            </div>

            <div className="BottomSide">
              {buttonsCategoriesName.map((button) => (
                <button
                  key={button}
                  className="buttonsCategoriesName"
                  onClick={() => handleMainContent(button)}
                >
                  {button}
                </button>
              ))}
            </div>

          </div>

          <div className="mainContent">
            {items.map((item) => (
              <div key={item.id} className="itemBlock">
                <img src={item.image} alt="itemImage" className="itemImage" />

                <div className="priceAndAdd">
                  <p className="price">${item.price}</p>
                  <button
                    className="addItemButton"
                    id={item.name}
                    onClick={() => handleAdd(item.id)}>
                    + Add
                  </button>
                </div>

                <div>{item.name}</div>
                <div>Many in stock</div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}
export default Store;