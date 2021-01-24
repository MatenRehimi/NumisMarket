import React, { useState } from "react";
import { storeProducts } from "../data.js";
import NavigationBar from "../components/NavigationBar";
import NotFoundPage from "./NotFoundPage.js";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import MuiAlert from "@material-ui/lab/Alert";
import { navigate } from "hookrouter";

import { useStyles } from "./styles/ProductDetailsPageStyle";
import { Grid, Snackbar } from "@material-ui/core";
import StyledButton from "../components/StyledButton.js";
import { useBasket } from "../context/BasketContext";

export default function ProductDetailsPage(props) {
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [message, setMessage] = useState("");
  const classes = useStyles(props);
  const { incrementProductQuantity } = useBasket();
  console.log(props);
  console.log("hi");
  const product = props.data;

  function handleClick() {
    const success = incrementProductQuantity(product);

    if (success) {
      setSeverity("success");
      setMessage("Added item to Basket!");
    } else {
      setSeverity("error");
      setMessage("No stock remaining!");
    }
    setOpen(true);
  }

  if (product) {
    const { title, img, price, info } = product;
    return (
      <div>
        <NavigationBar isHomePage={false} />
        <CssBaseline />
        <Container component="main" maxWidth="md">
          <div className={classes.paper}>
            <Grid container spacing={4}>
              <Grid item xs={6}>
                <center>
                  <img
                    className={classes.picture}
                    width={400}
                    height={400}
                    alt={title}
                    src={"/" + img}
                  />
                </center>
              </Grid>
              <Grid item xs={6}>
                <center>
                  <h2 className={classes.title}>{title}</h2>
                  <h2 className={classes.price}>{"Price: £" + price}</h2>

                  <p>Description: {info}</p>

                  <StyledButton
                    fullWidth
                    className={classes.addBasketButton}
                    onClick={() => handleClick()}
                    message="Add to basket"
                  />

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

                  <StyledButton
                    fullWidth
                    className={classes.backToProductsButton}
                    background="#2278CF"
                    color="primary"
                    variant="contained"
                    onClick={() => navigate("/")}
                    message="Back to products"
                  />
                </center>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
    );
  } else {
    return <h1>hello</h1>;
  }
}
