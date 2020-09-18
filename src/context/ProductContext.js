import React, { useState, useEffect } from "react";
import { storeProducts, detailProduct } from "../data.js";
const ProductContext = React.createContext();

function ProductProvider(props) {
  const [state, setState] = useState({
    products: [],
    detailProduct,
    cart: [],
    modalOpen: false,
    modalProduct: detailProduct,
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0,
  });

  storeProducts.forEach((item) => {
    const singleItem = { ...item };
    state.products = [...state.products, singleItem];
  });

  useEffect(() => {
    let products = [];
    storeProducts.forEach((item) => {
      const singleItem = { ...item };
      products = [...products, singleItem];
      console.log(products);
    });
  }, []);

  return (
    <ProductContext.Provider value={{ ...state }}>
      {props.children}
    </ProductContext.Provider>
  );
}
const ProductConsumer = ProductContext.Consumer;
export { ProductProvider, ProductConsumer };
