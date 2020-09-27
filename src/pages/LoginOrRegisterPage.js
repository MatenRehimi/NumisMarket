import React from "react";
import NavigationBar from "../components/NavigationBar.js";
import SignInPage from "./SignInPage";

export default function LoginOrRegisterPage(props) {
  return (
    <div>
      <NavigationBar isHomePage={false} />
      <SignInPage />
    </div>
  );
}
