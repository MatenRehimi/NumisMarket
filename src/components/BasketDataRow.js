import React from "react";
import { StyledTableRow, StyledTableCell } from "./styles/BasketTableStyle";
import { IconButton, TextField } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { useBasket } from "../context/BasketContext";

export default function BasketDataRow(props) {
  const product = props.product;
  const { removeFromBasket, decrementProductQuantity, incrementProductQuantity } = useBasket();
  const previousQuantity = product.numberInBasket;

  function handleQuantityChange(event) {
    if (event.target.valueAsNumber < previousQuantity) {
      decrementProductQuantity(product);
    } else {
      incrementProductQuantity(product);
    }
  }

  return (
    <StyledTableRow>
      <StyledTableCell align="center">
        <img src={"image/coin.jpg"} width={100} height={100} alt="coin" />
      </StyledTableCell>
      <StyledTableCell align="center" component="th" scope="row">
        {product.title}
      </StyledTableCell>

      <StyledTableCell align="center">{"£" + product.price.toFixed(2)}</StyledTableCell>
      <StyledTableCell align="center">
        <TextField
          onKeyDown={(e) => {
            e.preventDefault();
          }}
          defaultValue={product.numberInBasket}
          inputProps={{
            min: 0,
            max: product.quantity,
          }}
          variant="outlined"
          type="number"
          onChange={(e) => handleQuantityChange(e)}
        />
      </StyledTableCell>
      <StyledTableCell align="center">
        {"£" + (product.numberInBasket * product.price).toFixed(2)}
      </StyledTableCell>
      <StyledTableCell align="center">
        <IconButton onClick={() => removeFromBasket(product)}>
          <DeleteIcon />
        </IconButton>
      </StyledTableCell>
    </StyledTableRow>
  );
}
