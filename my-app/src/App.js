import "./App.css";
import { Link } from "react-router-dom";
import Walmart from "./stores/Walmart";
import { useState } from "react";

function App() {
  const [currentStore, setCurrentStore] = useState("HomePage");
  const handleSwitchStore = (storeName) => {
    setCurrentStore(storeName);
  };

  return (
    <>
      {currentStore === "HomePage" && (
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

      {currentStore === "Walmart" && <Walmart />}
    </>
  );
}

export default App;
