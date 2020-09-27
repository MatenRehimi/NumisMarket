import React from "react";
import NavigationBar from "../components/NavigationBar";
import BasketTable from "../components/BasketTable";
import { CssBaseline } from "@material-ui/core";
import { BasketConsumer } from "../context/BasketContext";

export default function BasketPage(props) {
  return (
    <React.Fragment>
      <NavigationBar isHomePage={false} />
      <CssBaseline />
      <center>
        <h1>Shopping Basket</h1>
      </center>
      <BasketConsumer>
        {(value) => {
          console.log(value.basket);
          return (
            <BasketTable
              basket={value.basket}
              getBasketSize={value.getBasketSize}
            />
          );
        }}
      </BasketConsumer>
    </React.Fragment>
  );
}
