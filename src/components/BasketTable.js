import React, { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { navigate } from "hookrouter";
import StyledButton from "./StyledButton";
import { useStyles, StyledTableCell } from "./styles/BasketTableStyle";
import BasketDataRow from "./BasketDataRow";
import { BasketConsumer } from "../context/BasketContext";

export default function BasketGrid(props) {
  const classes = useStyles(props);
  const basket = useState(props.basket);
  console.log("pop");

  const getBasketSize = props.getBasketSize;

  if (getBasketSize(basket[0]) === 0) {
    return (
      <React.Fragment>
        <center>
          <h3>
            Your shopping basket is empty! Please press the button below to
            continue shopping!
          </h3>
          <StyledButton
            onClick={() => navigate("/")}
            message="Back to products"
          />
        </center>
      </React.Fragment>
    );
  }
  return (
    <Table className={classes.table} aria-label="customized table">
      <TableHead>
        <TableRow>
          <StyledTableCell align="center">Image</StyledTableCell>
          <StyledTableCell align="center">Name</StyledTableCell>
          <StyledTableCell align="center">Single Price</StyledTableCell>
          <StyledTableCell align="center">Quantity</StyledTableCell>
          <StyledTableCell align="center">Total Price</StyledTableCell>
          <StyledTableCell align="center">Remove</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <BasketConsumer>
          {(value) => {
            return value.basket.map((item) => (
              <BasketDataRow key={item.id} product={item} />
            ));
          }}
        </BasketConsumer>
      </TableBody>
    </Table>
  );
}
