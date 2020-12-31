import React, { useState, createContext, useEffect, useContext } from "react";
import { auth } from "../firebase.js";

const AuthContext = createContext();

function AuthProvider(props) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signUp(email, password, firstName, lastName) {
    return new Promise((resolve, reject) => {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((cred) => {
          fetch("/.netlify/functions/createUser", {
            method: "POST",
            body: JSON.stringify({
              uid: cred.user.uid,
              email: cred.user.email,
              firstName,
              lastName,
            }),
          })
            .then((response) => response.json())
            .then((resp) => console.log(resp))
            .catch((error) => {
              console.log("error: " + error);
              reject(error);
            });
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  function signIn(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function signOut() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        signUp,
        signIn,
        signOut,
        resetPassword,
        updateEmail,
        updatePassword,
      }}
    >
      {!loading && props.children}
    </AuthContext.Provider>
  );
}

const AuthConsumer = AuthContext.Consumer;
export { AuthProvider, AuthConsumer, AuthContext };

export function useAuth() {
  return useContext(AuthContext);
}
