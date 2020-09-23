import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { AuthProvider } from "./context/AuthContext";
import { BasketProvider } from "./context/BasketContext";
import { useRoutes } from "hookrouter";
import Routes from "./router";
import PageNotFound from "./components/NotFoundPage";

function App() {
  document.title = "Numis Market";
  document.body.style.margin = 0;
  const routeResult = useRoutes(Routes);
  return (
    <AuthProvider>
      <BasketProvider>{routeResult || <PageNotFound />}</BasketProvider>
    </AuthProvider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
