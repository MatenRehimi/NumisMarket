import React, { useState } from "react";
import { StyledTableRow, StyledTableCell } from "./styles/BasketTableStyle";
import { IconButton, TextField } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { BasketConsumer } from "../context/BasketContext";

export default function BasketDataRow(props) {
  const product = props.product;
  const [quantity, setQuantity] = useState(product.numberInBasket);

  function handleQuantityChange(event) {
    console.log("hit");
    product.numberInBasket = event.target.valueAsNumber;
    if (event.target.valueAsNumber < 0) {
      setQuantity(0);
    } else if (event.target.valueAsNumber > product.quantity) {
      setQuantity(product.quantity);
    } else {
      setQuantity(event.target.valueAsNumber);
    }

    // setQuantity(event.target.valueAsNumber);
  }

  return (
    <StyledTableRow>
      <StyledTableCell align="center">
        <img src={"image/coin.jpg"} width={100} height={100} alt="coin" />
      </StyledTableCell>
      <StyledTableCell align="center" component="th" scope="row">
        {product.title}
      </StyledTableCell>

      <StyledTableCell align="center">{"£" + product.price}</StyledTableCell>
      <StyledTableCell align="center">
        <TextField
          onKeyDown={(e) => {
            e.preventDefault();
          }}
          defaultValue={quantity}
          inputProps={{
            min: "0",
            max: product.quantity,
          }}
          variant="outlined"
          type="number"
          onChange={(e) => handleQuantityChange(e)}
        />
      </StyledTableCell>
      <StyledTableCell align="center">
        {"£" + (quantity * product.price).toFixed(2)}
      </StyledTableCell>
      <StyledTableCell align="center">
        <BasketConsumer>
          {(value) => {
            return (
              <IconButton onClick={() => value.removeFromBasket(product)}>
                <DeleteIcon />
              </IconButton>
            );
          }}
        </BasketConsumer>
      </StyledTableCell>
    </StyledTableRow>
  );
}
