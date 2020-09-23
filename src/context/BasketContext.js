import React, { useState, useEffect, createContext } from "react";
const BasketContext = createContext();

function BasketProvider(props) {
  const [cart, setCart] = useState([]);
  const [cartSubTotal, setCartSubTotal] = useState(0);
  const [cartTax, setCartTax] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

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
    <BasketContext.Provider
      value={{ cart, cartSubTotal, cartTax, cartTotal, addToCart }}
    >
      {props.children}
    </BasketContext.Provider>
  );
}
const BasketConsumer = BasketContext.Consumer;
export { BasketProvider, BasketConsumer };
