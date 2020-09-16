import React, { useState } from "react";
import AuthContext from "./AuthContext";
import { useCookies } from "react-cookie";

export default function AuthContextProvider(props) {
  const [cookies, setCookie] = useCookies(["token"]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loginFunction = (email, password) => {
    console.log("1");
    console.log(password);
    setLoading(true);

    setTimeout(() => {
      if (password !== "123") {
        console.log("2");
        setError("Wrong credentials");
        console.log("3");
      } else {
        setCookie("token", "jwtencodedtoken$123");
        setError("");
      }
      //  setLoading(false);
    }, 1000);
  };

  return (
    <AuthContext.Provider
      value={{
        token: cookies.token,
        error,
        loading,
        login: loginFunction,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
