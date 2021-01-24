import React from "react";
import HomePage from "./pages/HomePage.js";
import SignInPage from "./pages/SignInPage.js";
import SignUpPage from "./pages/SignUpPage.js";
import PasswordResetPage from "./pages/PasswordResetPage.js";
import ProductDetailsPage from "./pages/ProductDetailsPage.js";
import BasketPage from "./pages/BasketPage.js";
import ProfilePage from "./pages/ProfilePage.js";
import UpdateProfilePage from "./pages/UpdateProfilePage.js";
import CheckoutPage from "./pages/CheckoutPage.js";

const routes = {
  "/": () => <HomePage />,
  "/signInPage": () => <SignInPage />,
  "/signUpPage": () => <SignUpPage />,
  "/passwordResetPage": () => <PasswordResetPage />,
  "/productDetailsPage": (product) => <ProductDetailsPage product={product} />,
  "/basketPage": () => <BasketPage />,
  "/profilePage": () => <ProfilePage />,
  "/updateProfilePage": () => <UpdateProfilePage />,
  "/checkoutPage": () => <CheckoutPage />,
};

export default routes;
