import "./Store.css";
import { useState } from "react";
import logo from "./images/Instacart.png";
import arrowLeft from "./images/arrow-left.png";
import search from "./images/search.png";
import WalmartLogo from "./images/Walmart.png";
function Walmart() {
  const [searchTerm, setSearchTerm] = useState("");
  const [content, setContent] = useState("");
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    onSeach(searchTerm);
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
    setContent(content);
  };
  return (
    <>
      <div className="Store">
        <header className="Header">
          {/* <div>Logo</div> */}
          <img src={logo} alt="Logo" className="logo" />

          <button className="goBack">
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
              <img src={WalmartLogo} alt="Logo" className="WalmartLogo" />
              <div>Welcome to Walmart online grocery</div>
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
          <div className="mainContent">{content}</div>
        </div>
      </div>
    </>
  );
}
export default Walmart;
