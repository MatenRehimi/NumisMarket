import React, { useState, useEffect, createContext, useContext } from "react";
import { useAuth } from "./AuthContext";

const BasketContext = createContext();

function BasketProvider(props) {
  const { currentUser } = useAuth();
  const [basket, setBasket] = useState([]);

  //Initial Load
  useEffect(() => {
    if (currentUser) {
      //Load data from dB

      if (!localStorage.basket || localStorage.basket.length === 0) {
        fetch("/.netlify/functions/getBasket", {
          method: "POST",
          body: JSON.stringify({
            uid: currentUser.uid,
          }),
        })
          .then((resp) => resp.json())
          .then((resp) => setBasket(resp.basket))
          .catch((err) => console.log(err));
      } else {
        const basket = JSON.parse(localStorage.getItem("basket"));
        fetch("/.netlify/functions/setBasket", {
          method: "POST",
          body: JSON.stringify({
            uid: currentUser.uid,
            basket,
          }),
        }).catch((err) => console.log(err));
        localStorage.clear();
      }
    } else {
      //Load data from localstorage
      if (localStorage.basket) {
        setBasket(JSON.parse(localStorage.getItem("basket")));
      }
    }
  }, [currentUser]);

  //Saving data
  useEffect(() => {
    if (!currentUser) {
      //Save data into localstorage
      localStorage.setItem("basket", JSON.stringify(basket));
    } else {
      //save data into DB
      fetch("/.netlify/functions/setBasket", {
        method: "POST",
        body: JSON.stringify({
          uid: currentUser.uid,
          basket,
        }),
      }).catch((err) => console.log(err));
    }
  }, [basket, currentUser]);

  function removeFromBasket(product) {
    setBasket(basket.filter((item) => item.id !== product.id));
  }

  function getBasketSize() {
    return basket.reduce((total, item) => total + item.numberInBasket, 0);
  }

  function decrementProductQuantity(product) {
    if (!product) {
      return false;
    }
    const productInBasket = basket.find((item) => item.id === product.id);
    if (!productInBasket) {
      return false;
    }

    if (productInBasket.numberInBasket - 1 <= 0) {
      removeFromBasket(product);
    } else {
      productInBasket.numberInBasket--;
      setBasket([...basket]);
    }
    return true;
  }

  function incrementProductQuantity(product) {
    if (!product) {
      return false;
    }
    const productInBasket = basket.find((item) => item.id === product.id);
    if (productInBasket) {
      if (productInBasket.numberInBasket > productInBasket.quantity) {
        return false;
      }
      productInBasket.numberInBasket++;
      setBasket([...basket]);
    } else {
      product.numberInBasket++;
      setBasket([...basket, product]);
    }
    return true;
  }

  return (
    <BasketContext.Provider
      value={{
        basket,
        getBasketSize,
        removeFromBasket,
        incrementProductQuantity,
        decrementProductQuantity,
      }}
    >
      {props.children}
    </BasketContext.Provider>
  );
}
const BasketConsumer = BasketContext.Consumer;
export { BasketProvider, BasketConsumer };

export function useBasket() {
  return useContext(BasketContext);
}
