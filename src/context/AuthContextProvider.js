import React, { useState } from "react";
import AuthContext from "./AuthContext";
import { useCookies } from "react-cookie";
import cryptoRandomString from "crypto-random-string";

export default function AuthContextProvider(props) {
  const [cookies, setCookie] = useCookies(["token"]);

  const [error, setError] = useState("");

  const loginFunction = (email, password) => {
    setTimeout(() => {
      if (password !== "123") {
        setError("Wrong credentials");
      } else {
        setCookie(
          "token",
          cryptoRandomString({ length: 15, type: "alphanumeric" })
        );
        setError("");
      }
    }, 1000);
  };

  return (
    <AuthContext.Provider
      value={{
        token: cookies.token,
        error,
        login: loginFunction,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
