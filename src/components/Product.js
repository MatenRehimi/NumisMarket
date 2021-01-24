import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { navigate } from "hookrouter";
import MuiAlert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";

import { useStyles } from "./styles/ProductStyle.js";
import StyledButton from "./StyledButton.js";
import { useBasket } from "../context/BasketContext";

export default function Product(props) {
  const classes = useStyles(props);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const { id, title, image, price } = props.product;
  const { incrementProductQuantity } = useBasket();

  function handleClick() {
    const success = incrementProductQuantity(props.product);

    if (success) {
      setSeverity("success");
      setMessage("Added item to Basket!");
    } else {
      setSeverity("error");
      setMessage("No stock remaining!");
    }
    setOpen(true);
  }

  return (
    <Grid item xs={6} md={4} lg={3}>
      <Paper className={classes.paper} elevation={5}>
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <Typography gutterBottom>{title}</Typography>
          </Grid>
          <Grid item xs={12}>
            <ButtonBase
              className={classes.image}
              onClick={() => navigate("/productDetailsPage", false, { data: 5 })}
              // onClick={() => navigate("/productDetailsPage/" + id)}
            >
              <img className={classes.img} alt={title} src={"/" + image} />
            </ButtonBase>
          </Grid>
          <Grid container direction="row" justify="space-evenly">
            <Grid item xs={6} className={classes.price}>
              <Typography gutterBottom>{"£" + price.toFixed(2)}</Typography>
            </Grid>
            <Grid item xs={6}>
              <StyledButton onClick={() => handleClick()}>
                <Grid item container direction="row">
                  <Grid item style={{ marginTop: "auto", marginBottom: "auto" }} xs={10}>
                    <Typography
                      style={{
                        fontSize: 13,
                      }}
                    >
                      Add to basket
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <ShoppingBasketIcon className={classes.shoppingBasketIcon} />
                  </Grid>
                </Grid>
              </StyledButton>

              <Snackbar
                autoHideDuration={1250}
                message={message}
                open={open}
                onClose={() => setOpen(false)}
              >
                <MuiAlert
                  elevation={6}
                  variant="filled"
                  onClose={() => setOpen(false)}
                  severity={severity}
                >
                  {message}
                </MuiAlert>
              </Snackbar>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
