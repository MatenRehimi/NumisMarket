import React, { useState, useEffect, createContext } from "react";
const BasketContext = createContext();

function BasketProvider(props) {
  console.log("basketcontext render");
  const [cart, setCart] = useState([]);

  useEffect(() => {
    console.log("effect");
    console.log("cart:" + cart);
    console.log("cartSubTotal:");
  }, [cart]);

  function addToCart(product) {
    if (parseInt(product.quantity) === 0) {
      console.log("is ZERO");
      return false;
    }
    console.log(product);
    console.log(product.quantity);
    setCart([...cart, product]);
    return true;
  }

  function getBasketSize() {
    return cart.length;
  }

  return (
    <BasketContext.Provider value={{ cart, addToCart, getBasketSize }}>
      {props.children}
    </BasketContext.Provider>
  );
}
const BasketConsumer = BasketContext.Consumer;
export { BasketProvider, BasketConsumer };
