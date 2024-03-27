import { useState, useEffect } from "react";
import logo from "./images/Instacart.png";
import arrowLeft from "./images/arrow-left.png";
import search from "./images/search.png";
import WalmartLogo from "./images/Walmart.png";
import TandTLogo from "./images/TandT.png";
import CostcoLogo from "./images/Costco.png";
import SuperStoreLogo from "./images/Canadian.png";
// import data from "./data/data.json";

import "./Store.css";

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
  // const [order, setOrder] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [hideToggle, setHideTggle] = useState("hidden");
  const [visible, setVisible] = useState(false);
  let demoView = "";
  // let toggle = 0;
  const storeNames = {
    Walmart: WalmartLogo,
    Costco: CostcoLogo,
    SuperStore: SuperStoreLogo,
    TandT: TandTLogo,
  };
  const [searchTerm, setSearchTerm] = useState("");
  const [content, setContent] = useState("");
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleSubmit = (event) => {
    setItems([]);
    event.preventDefault();
    // onSeach(searchTerm);
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
    // Find the index of the item in the order array
    const itemIndex = order.findIndex((item) => item.id === id);
    // If item is not found, exit the function
    if (itemIndex === -1) return;
    order[itemIndex].quantity += 1;
    setOrder([...order]);
    let totalPrice = 0;
    for (const i of order) {
      totalPrice = totalPrice + i.price * i.quantity;
    }
    setTotalPrice(totalPrice);

    const price = setTotalPrice(totalPrice);
  };
  const handleDeleteQuantity = (id) => {
    // Find the index of the item in the order array
    const itemIndex = order.findIndex((item) => item.id === parseInt(id));
    // If item is not found, exit the function
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

    const price = setTotalPrice(totalPrice);
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

  const buttonNames = [
    "For You",
    "Produce",
    "Pharmacy",
    "Beauty",
    "Convenience",
    "Retail",
    "WholeSale",
    "More",
  ];
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

  return (
    <>
      <div>{user.name}</div>
      <div className="Store">
        <header className="Header">
          {/* <div>Logo</div> */}
          <img src={logo} alt="Logo" className="logo" />

          <button className="goBack" onClick={handleGoBack}>
            <img src={arrowLeft} alt="Logo" className="button-logo" />
            <span className="button-text">Back</span>
          </button>
          <form onSubmit={handleSubmit} className="submitForm">
            <button type="submit" className="submit">
              <img src={search} alt="Logo" className="search" />
            </button>
            <input
              type="text"
              placeholder="Search for items"
              value={searchTerm}
              onChange={handleChange}
            />
          </form>
          <div>Order</div>
          <button className="Cart" onClick={handleViewOrder}>
            Cart
          </button>
          <div>Profile</div>
        </header>

        <nav className="Nav">
          {buttonNames.map((button) => (
            <button key={button} className="buttonNav">
              {button}
            </button>
          ))}
        </nav>
        <div className="CardExtend" id={hideToggle}>
          <div className="SubCardExtend">
            <div>
              <button className="backToStore" onClick={handleViewOrder}>
                Back
              </button>
            </div>
            <div>
              <h2>View Order pageOrder</h2>
            </div>
          </div>

          <ul>
            {order.map((item) => (
              <div className="eachItem">
                {" "}
                <li key={item.id}>
                  {item.name} quantity: {item.quantity} price: {item.price}
                </li>
                <button
                  className="AddDelete"
                  onClick={() => handleAddQuantity(item.id)}
                >
                  Add 1
                </button>
                <button
                  className="AddDelete"
                  onClick={() => handleDeleteQuantity(item.id)}
                >
                  Delete 1
                </button>
              </div>
            ))}
          </ul>
          <div>The total price is {totalPrice.toFixed(2)}</div>

          <div>
            <button className="checkOut" onClick={handleCheckout}>
              Go to checkout
            </button>
          </div>
        </div>
        <div className="main">
          <div className="Side">
            <div className="TopSide">
              {/* <img src={WalmartLogo} alt="Logo" className="WalmartLogo" /> */}
              <img src={storeNames[store]} alt="Logo" className="WalmartLogo" />
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
                  <p className="price">{item.price}</p>
                  <button
                    className="addItemButton"
                    id={item.name}
                    onClick={() => handleAdd(item.id)}
                  >
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
