import "./Store.css";
import { useState } from "react";
import logo from "./images/Instacart.png";
import arrowLeft from "./images/arrow-left.png";
import search from "./images/search.png";
import WalmartLogo from "./images/Walmart.png";
import TandTLogo from "./images/TandT.png";
import CostcoLogo from "./images/Costco.png";
import SuperStoreLogo from "./images/Canadian.png";
import data from "./data/data.json";

function Store({
  store,
  id,
  setCurrentStore,
  setPreviousStore,
  order,
  setOrder,
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
    console.log(searchTerm);
    setItems(
      data.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };
  const handleGoBack = () => {
    setCurrentStore("HomePage");
  };
  const handleAdd = (id) => {
    let addingItem = data.find((item) => item.id == parseInt(id));
    addingItem = {
      name: addingItem.name,
      id: addingItem.id,
      quantity: 1,
      price: addingItem.price,
    };
    const updateOrder = [...order];

    updateOrder.push(addingItem);
    let price = calculateTotalPrice(updateOrder);
    setTotalPrice(price);
    setOrder(updateOrder);
    console.log("order");
    console.log(order);
  };
  const calculateTotalPrice = (order) => {
    let totalPrice = 0;
    for (const i of order) {
      totalPrice += i.price * i.quantity;

      return totalPrice;
    }
  };

  const handleAddQuantity = (id) => {
    // Find the index of the item in the order array
    const itemIndex = order.findIndex((item) => item.id === parseInt(id));
    console.log("itemIndex");
    console.log(itemIndex);
    // If item is not found, exit the function
    if (itemIndex === -1) return;
    order[itemIndex].quantity += 1;
    setOrder([...order]);
    setTotalPrice(calculateTotalPrice(order));
    console.log("totalPrice");
    console.log(setTotalPrice(calculateTotalPrice(order)));
  };
  const handleDeleteQuantity = (id) => {
    // Find the index of the item in the order array
    const itemIndex = order.findIndex((item) => item.id === parseInt(id));
    console.log("itemIndex");
    console.log(itemIndex);
    // If item is not found, exit the function
    if (itemIndex === -1) return;
    if (order[itemIndex].quantity > 1) {
      order[itemIndex].quantity -= 1;
    } else if (order[itemIndex].quantity == 1) {
      order.splice(itemIndex, 1);
    }
    setOrder([...order]);
    setTotalPrice(calculateTotalPrice(order));
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
    setItems([]);
    if (content == "Dairy&Milk") {
      // setItems([]);
      setItems(filterItemsByCategory(data, "dairy"));
      console.log("click for dairy");
    } else if (content == "Vegetables") {
      // setItems([]);
      setItems(filterItemsByCategory(data, "fresh-produce"));
      console.log("click for vegetable");
    } else if (content == "Fruits") {
      setItems(filterItemsByCategory(data, "fruits"));
    } else if (content == "Meat") {
      setItems(filterItemsByCategory(data, "meat-seafood"));
    } else if (content == "Beverages") {
      setItems(filterItemsByCategory(data, "beverages"));
    }
    console.log("click here ");

    setContent(content);
  };
  function filterItemsByCategory(dat, category) {
    return dat.filter((item) => item.category === category);
  }
  const handleCheckout = () => {
    console.log("click on handle checkout");
    setPreviousStore(store);
    setCurrentStore("CheckoutPage");
  };

  return (
    <>
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
          <div>The total price is {totalPrice}</div>

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
                <img
                  src={item["image"]}
                  alt="itemImage"
                  className="itemImage"
                />
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
            {/* </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
export default Store;
