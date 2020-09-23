import React from "react";
import HomePage from "./components/HomePage.js";
import SignInPage from "./components/SignInPage.js";
import SignUpPage from "./components/SignUpPage.js";
import ProductDetailsPage from "./components/ProductDetailsPage.js";

const routes = {
  "/": () => <HomePage />,
  "/SignInPage": () => <SignInPage />,
  "/SignUpPage": () => <SignUpPage />,
  "/ProductDetailsPage/:id": ({ id }) => <ProductDetailsPage productID={id} />,
};

export default routes;
