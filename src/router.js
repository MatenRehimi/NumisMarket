import React from "react";
import HomePage from "./pages/HomePage.js";
import SignInPage from "./pages/SignInPage.js";
import SignUpPage from "./pages/SignUpPage.js";
import ProductDetailsPage from "./pages/ProductDetailsPage.js";
import BasketPage from "./pages/BasketPage.js";

const routes = {
  "/": () => <HomePage />,
  "/signInPage": () => <SignInPage />,
  "/signUpPage": () => <SignUpPage />,
  "/productDetailsPage/:id": ({ id }) => <ProductDetailsPage productID={id} />,
  "/basketPage": () => <BasketPage />,
};

export default routes;
