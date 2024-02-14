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

function Store({ store, id, setCurrentStore }) {
  const [items, setItems] = useState([]);
  console.log(data);
  console.log(store);
  const storeNames = {
    Walmart: WalmartLogo,
    Costco: CostcoLogo,
    SuperStore: SuperStoreLogo,
    TandT: TandTLogo,
  };
  console.log(id);
  const [searchTerm, setSearchTerm] = useState("");
  const [content, setContent] = useState("");
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    onSeach(searchTerm);
  };
  const handleGoBack = () => {
    setCurrentStore("HomePage");
  };

  const onSeach = (searchTerm) => {
    console.log("item search for", searchTerm);
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
    if (content == "Dairy&Milk") {
      setItems(filterItemsByCategory(data, "dairy"));
    }
    setContent(content);
  };
  function filterItemsByCategory(dat, category) {
    return dat.filter((item) => item.category === category);
  }

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
          <div>Cart</div>
          <div>Profile</div>
        </header>

        <nav className="Nav">
          {buttonNames.map((button) => (
            <button key={button} className="buttonNav">
              {button}
            </button>
          ))}
        </nav>
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
            {/* <div className="items"> */}
            {items.map((item) => (
              <div key={item.id} className="itemBlock">
                <img
                  src={item["image"]}
                  alt="itemImage"
                  className="itemImage"
                />
                <div className="priceAndAdd">
                  <p>{item.price}</p>
                  <button className="addItemButton">+ADD</button>
                </div>

                <p>{item.name}</p>
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
