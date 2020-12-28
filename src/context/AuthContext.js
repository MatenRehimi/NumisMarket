import React, { useState, createContext, useEffect, useContext } from "react";
import { auth } from '../firebase.js';

const AuthContext = createContext();

function AuthProvider(props) {
  const [currentUser, setCurrentUser]= useState()
  const [loading, setLoading] = useState(true)

  // const sendData = async (email,password) => {
  //    fetch('http://localhost:9000/getusers', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({"email":email,"password":password })
  //   }).then(response => response.json())
  //   .then(data => console.log("data: " + data))
  //   .catch(error=> {
  //     console.log("error: "+error)
  //   })
  // }

  function signUp(email,password) {
    //
    return auth.createUserWithEmailAndPassword(email,password);
  }

  function signIn(email,password) {
    return auth.signInWithEmailAndPassword(email,password);
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
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false);
    })
    return unsubscribe
  }, [])


  return (
    <AuthContext.Provider
      value={{
        currentUser,
        signUp,
        signIn,
        signOut,
        resetPassword,
        updateEmail,
        updatePassword
      }}
    > 
      {!loading && props.children}
    </AuthContext.Provider>
  );
}

const AuthConsumer = AuthContext.Consumer;
export { AuthProvider, AuthConsumer, AuthContext };

export function useAuth() {
  return useContext(AuthContext)
}
