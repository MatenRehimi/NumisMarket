import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import { useRoutes } from "hookrouter";
import Routes from './router'

const maintenance = false;

function App() {
  const routeResult = useRoutes(Routes)
  return routeResult;
}
if (maintenance) {
  ReactDOM.render(null, document.getElementById('root'));
} else {
  ReactDOM.render(<App />, document.getElementById('root'));
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
