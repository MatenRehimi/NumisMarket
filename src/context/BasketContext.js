import React, { useState, useEffect, createContext } from "react";
const BasketContext = createContext();

function BasketProvider(props) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    console.log("effect");
    console.log("cart:" + cart);
    console.log("cartSubTotal:");
  }, [cart]);

  function addToCart(product) {
    console.log(product);
    setCart([...cart, product]);
  }

  return (
    <BasketContext.Provider value={{ cart, addToCart }}>
      {props.children}
    </BasketContext.Provider>
  );
}
const BasketConsumer = BasketContext.Consumer;
export { BasketProvider, BasketConsumer };
