import React, { useState } from "react";
import { storeProducts } from "../data.js";
import NavigationBar from "./NavigationBar.js";
import NotFoundPage from "./NotFoundPage.js";
import Zoom from "react-img-zoom";
import { BrowserView, MobileView } from "react-device-detect";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import MuiAlert from "@material-ui/lab/Alert";
import { BasketConsumer } from "../context/BasketContext";

import { useStyles } from "../styles/ProductDetailsPageStyle.js";
import { Grid, Button, Snackbar, TextField } from "@material-ui/core";

export default function ProductDetailsPage(props) {
  const [open, setOpen] = useState(false);
  const classes = useStyles(props);
  const product = storeProducts.find(
    (item) => item.id === parseInt(props.productID)
  );

  if (product) {
    const { id, title, img, price, company, info } = product;
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
                        <Button
                          fullWidth
                          className={classes.addBasketButton}
                          background="#2278CF"
                          color="primary"
                          variant="contained"
                          onClick={() => {
                            setOpen(true);
                            value.addToCart(product);
                          }}
                        >
                          Add to basket
                        </Button>
                      );
                    }}
                  </BasketConsumer>
                  <Snackbar
                    autoHideDuration={1000}
                    message="Item has been added"
                    open={open}
                    onClose={() => setOpen(false)}
                  >
                    <MuiAlert
                      elevation={6}
                      variant="filled"
                      onClose={() => setOpen(false)}
                      severity="success"
                    >
                      Added item to Basket!
                    </MuiAlert>
                  </Snackbar>

                  <Button
                    fullWidth
                    className={classes.backToProductsButton}
                    background="#2278CF"
                    color="primary"
                    variant="contained"
                    href="/"
                  >
                    Back to products
                  </Button>
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
