import React from "react";
import HomePage from "./components/HomePage.js";
import SignInPage from "./components/SignInPage.js";
import SignUpPage from "./components/SignUpPage.js";

const routes = {
  "/": () => <HomePage />,
  "/SignInPage": () => <SignInPage />,
  "/SignUpPage": () => <SignUpPage />,
};

export default routes;
