function CheckoutPage({ setCurrentStore, previousStore, order, setOrder }) {
  console.log("This is a checkoutpgae");
  const handleBacktoStore = () => {
    setCurrentStore(previousStore);
  };

  return (
    <>
      <ul>
        {order.map((item) => (
          <li key={item.id}>
            {item.name} quantity: 1 price: {item.price}
          </li>
        ))}
      </ul>

      <button id="GoBackStore" onClick={handleBacktoStore}>
        Go back to the store page
      </button>

      <button>Proceed to checkout</button>
    </>
  );
}
export default CheckoutPage;
