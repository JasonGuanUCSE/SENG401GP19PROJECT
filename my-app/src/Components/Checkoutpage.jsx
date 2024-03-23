import React, { useEffect, useState } from "react";
import Cards from "react-credit-cards-2";
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from "./utils/utils";

import "react-credit-cards-2/dist/es/styles-compiled.css";
import "./Checkoutpage.css";

function CheckoutPage({ setCurrentStore, previousStore, order, setOrder,user,viewOrder,setViewOrder }) {
  const [state, setState] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    focus: "",
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "number") {
      setState((prev) => ({
        ...prev,
        [name]: formatCreditCardNumber(value),
      }));
    } else if (name === "expiry") {
      setState((prev) => ({
        ...prev,
        [name]: formatExpirationDate(value),
      }));
    } else if (name === "cvc") {
      setState((prev) => ({
        ...prev,
        [name]: formatCVC(value),
      }));
    } else {
      setState((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  let quantity = 0;
  for (const i of order) {
    quantity = quantity + i.quantity;
  }

  const handleInputFocus = (e) => {
    setState((prev) => ({
      ...prev,
      focus: e.target.name,
    }));
  };

  const handleFocusOut = (e) => {
    setState((prev) => ({
      ...prev,
      focus: "",
    }));
  };

  const itemTotals = {
    ...order.reduce((acc, item) => {
      const totalCost = item.price * item.quantity;
      return {
        ...acc,
        [item.id]: {
          count: (acc[item.id]?.count || 0) + 1,
          totalCost: (acc[item.id]?.totalCost || 0) + totalCost,
        },
      };
    }
    , {}),
  }

  const uniqueOrder = order.filter(
    (item, index, self) =>
      index === self.findIndex((t) => t.id === item.id && t.name === item.name)
  );

  const subtotal = {
    estimate: parseFloat(
      Object.values(itemTotals)
        .reduce((acc, item) => acc + item.totalCost, 0)
        .toFixed(2)
    ),
    taxes: parseFloat(
      Object.values(itemTotals)
        .reduce((acc, item) => acc + item.totalCost, 0)
        .toFixed(2) * 0.05
    ),
    fees: 5.0,
  };
  const handlePaymentConfirm = () => {
    console.log("Payment Confirmed");
    setCurrentStore("HomePage");
    //Add the order to the viewOrder
    setViewOrder([...viewOrder,...order]);
    // Other logic related to payment confirmation can go here
  }
  

  return (
    <>
    <div>{user.name}</div>
    <div className="checkout-page">
      <div className="section-title">
        <h1>Cart</h1>
        <span>({order.length} items)</span>
      </div>
      <div className="section">
        <div className="basket-display">
          <div className="basket-body">
            <ul>
              {uniqueOrder.map((item) => (
                <li key={item.id} className="list-item">
                  <div className="self-start"></div>
                  <div className="item-section">
                    <div className="item-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="item-description">
                      <div className="item-name">{item.name}</div>

                      <div className="item-price">{item.price}/ea  x  {item.quantity}</div>
                    </div>
                    <div className="item-price-total">
                      <div className="price-column">
                        <div className="total">
                          ${itemTotals[item.id].totalCost.toFixed(2)}
                        </div>
                        {itemTotals[item.id].count > 1 ? (
                          <div className="item-price sum">
                            {itemTotals[item.id].count} x ${item.price}/ea
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="basket-footer">
            <div className="summary">
              <div className="style1" id="first">
                <div className="col-name">
                  Subtotal
                  <span>({quantity} items)</span>
                </div>
                <div className="col-flex">
                  <div className="right">${subtotal.estimate.toFixed(2)}</div>
                </div>
              </div>
              <div className="style2">
                <div className="col-name">Delivery Fee</div>
                <div className="col-flex">
                  <div className="right">${subtotal.fees.toFixed(2)}</div>
                </div>
              </div>
              <div className="style1">
                <div className="col-name">Taxes</div>
                <div className="col-flex">
                  <div className="right">${subtotal.taxes.toFixed(2)}</div>
                </div>
              </div>
              <div className="style2">
                <div className="col-name">5% GST</div>
                <div className="col-flex">
                  <div className="right">${subtotal.taxes.toFixed(2)}</div>
                </div>
              </div>
              <div className="style2 bold">
                <span className="col-name">Total Estimate</span>
                <div className="col-flex">
                  <div className="right">
                    $
                    {(
                      subtotal.taxes +
                      subtotal.estimate +
                      subtotal.fees
                    ).toFixed(1) + 0}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-display">
          <div className="card-view">
            <Cards
              number={state.number}
              name={state.name}
              expiry={state.expiry}
              cvc={state.cvc}
              focused={state.focus}
              preview={true}
              acceptedCards={["visa", "mastercard"]}
            />
          </div>
          <div className="input-fields">
            <div>
              <label for="name">Full Name</label>
              <input
                name="name"
                type="text"
                placeholder="e.g., John Doe"
                required
                value={state.name}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
            </div>
            <div>
              <label for="number">Card Number</label>
              <input
                name="number"
                type="tel"
                placeholder="1234 5678 1234 5678"
                pattern="[\d| ]{16,22}"
                required
                value={state.number}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
            </div>
            <div className="small-input">
              <div>
                <label for="expiry">Expiry Date</label>
                <input
                  type="text"
                  name="expiry"
                  placeholder="MM/YY"
                  required
                  value={state.expiry}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
              </div>
              <div>
                <label for="cvc">Security Code</label>
                <input
                  type="number"
                  name="cvc"
                  placeholder="123"
                  required
                  value={state.cvc}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  onBlur={handleFocusOut}
                />
              </div>
            </div>
          </div>
          <div className="submit-buttons">
            <button onClick={() => setCurrentStore(previousStore)}>
              Go Back
            </button>
            <button onClick={()=>handlePaymentConfirm()}>Confirm Payment</button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default CheckoutPage;
