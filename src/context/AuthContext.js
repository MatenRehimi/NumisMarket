import React, { useState, createContext } from "react";
import { useCookies } from "react-cookie";
import cryptoRandomString from "crypto-random-string";

const AuthContext = createContext();

function AuthProvider(props) {
  const [cookies, setCookie] = useCookies(["token"]);

  const [error, setError] = useState("");

  const sendData = async (email,password) => {

     fetch('http://localhost:9000/getusers', {
      method: 'POST',
      // headers: {
      //   'Content-Type' : 'application/json',
      // },
      body: JSON.stringify({ email,password }),
    })
  }

  // const fetchUsers = async (email,password) => {
  //   await( await fetch('http://localhost:9000/getusers')).json();
  // }

  const loginFunction = (email, password) => {
    console.log("reached")
    setTimeout(() => {
      
      sendData(email,password)
    //   fetchUsers(email,password).then(data => {
    //     console.log(data);
    //   }
    // ).catch(error =>
    //   console.log(error)
    //   )

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

const AuthConsumer = AuthContext.Consumer;
export { AuthProvider, AuthConsumer, AuthContext };
