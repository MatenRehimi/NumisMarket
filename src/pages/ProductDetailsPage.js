import React, { useState } from "react";
import { storeProducts } from "../data.js";
import NavigationBar from "../components/NavigationBar";
import NotFoundPage from "./NotFoundPage.js";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import MuiAlert from "@material-ui/lab/Alert";
import { BasketConsumer } from "../context/BasketContext";
import { navigate } from "hookrouter";

import { useStyles } from "./styles/ProductDetailsPageStyle";
import { Grid, Snackbar } from "@material-ui/core";
import StyledButton from "../components/StyledButton.js";

export default function ProductDetailsPage(props) {
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("success");
  const classes = useStyles(props);
  const product = storeProducts.find(
    (item) => item.id === parseInt(props.productID)
  );

  function handleTrueClick() {
    setOpen(true);
    setSeverity("success");
  }

  function handleFalseClick() {
    setOpen(true);
    setSeverity("error");
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
                  <BasketConsumer>
                    {(value) => {
                      return (
                        <StyledButton
                          fullWidth
                          className={classes.addBasketButton}
                          onClick={() => {
                            value.addToBasket(product)
                              ? handleTrueClick()
                              : handleFalseClick();
                          }}
                          message="Add to basket"
                        />
                      );
                    }}
                  </BasketConsumer>
                  <Snackbar
                    autoHideDuration={1250}
                    message="Item has been added"
                    open={open}
                    onClose={() => setOpen(false)}
                  >
                    <MuiAlert
                      elevation={6}
                      variant="filled"
                      onClose={() => setOpen(false)}
                      severity={severity}
                    >
                      {severity === "success"
                        ? "Added item to Basket!"
                        : "No stock remaining!"}
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
    return <NotFoundPage />;
  }
}
