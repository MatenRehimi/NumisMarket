import React, { useState, useEffect, createContext } from "react";

const BasketContext = createContext();

function BasketProvider(props) {
  const [basket, setBasket] = useState([]);

  useEffect(() => {
  }, [basket]);

  function addToBasket(product) {
    if (
      parseInt(product.quantity) === 0 ||
      parseInt(product.numberInBasket) >= parseInt(product.quantity)
    ) {
      return false;
    }
    product.numberInBasket = product.numberInBasket + 1;
    if (basket.find((item) => item.id === parseInt(product.id))) {
      setBasket([...basket]);
    } else {
      setBasket([...basket, product]);
    }
    return true;
  }

  function removeFromBasket(product) {
    product.numberInBasket = 0;
    setBasket(basket.filter((item) => item.id !== parseInt(product.id)));
  }

  function getBasketSize() {
    return basket.reduce((total, item) => total + item.numberInBasket, 0);
  }

  return (
    <BasketContext.Provider
      value={{ basket, addToBasket, getBasketSize, removeFromBasket }}
    >
      {props.children}
    </BasketContext.Provider>
  );
}
const BasketConsumer = BasketContext.Consumer;
export { BasketProvider, BasketConsumer };
