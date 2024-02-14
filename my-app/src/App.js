import "./App.css";
import { Link } from "react-router-dom";
import Store from "./stores/Store";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState("");
  const [currentStore, setCurrentStore] = useState("HomePage");
  const handleSwitchStore = (storeName) => {
    setCurrentStore(storeName);
  };
  async function fetchData() {
    try {
      const response = await fetch(
        "https://api.kroger.com/v1/connect/oauth2/authorize"
      );
      console.log(response); // Log the response object
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData(); // Call fetchData when the component mounts
  }, []); // Empty dependency array ensures this effect runs only once after the initial render

  console.log(data);

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

      {currentStore !== null && currentStore !== "HomePage" && (
        <Store store={currentStore} id={1} setCurrentStore={setCurrentStore} />
      )}
    </>
  );
}

export default App;
