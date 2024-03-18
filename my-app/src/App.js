import "./App.css";
import { Link } from "react-router-dom";
import Store from "./stores/Store";
import CheckoutPage from "./Components/Checkoutpage";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState("");
  const [order, setOrder] = useState([]);
  const [currentStore, setCurrentStore] = useState("HomePage");
  const [previousStore, setPreviousStore] = useState(""); //To go back to from checkout to store
  const handleSwitchStore = (storeName) => {
    setCurrentStore(storeName);
  };

  return (
    <>
      {currentStore === "HomePage" && currentStore !== "CheckoutPage" && (
        <>
          <div>Top</div>
          <div>
            <button
              className="store"
              id="Walmart"
              onClick={() => handleSwitchStore("Walmart")}
            >
              Walmart
            </button>

            <button
              className="store"
              id="Costco"
              onClick={() => handleSwitchStore("Costco")}
            >
              Costco
            </button>
            <button
              className="store"
              id="SuperStore"
              onClick={() => handleSwitchStore("SuperStore")}
            >
              SuperStore
            </button>
            <button
              className="store"
              id="TT"
              onClick={() => handleSwitchStore("TandT")}
            >
              T&T SuperMarket
            </button>
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
