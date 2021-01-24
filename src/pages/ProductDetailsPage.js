import React, { useState, useEffect } from "react";
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

async function getProduct(id) {
  const response = await fetch("/.netlify/functions/findProduct", {
    method: "POST",
    body: JSON.stringify({
      id: id,
    }),
  });
  const data = await response.json();
  return data;
}

export default function ProductDetailsPage(props) {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [message, setMessage] = useState("");
  const classes = useStyles(props);
  const { incrementProductQuantity } = useBasket();

  useEffect(() => {
    const data = getProduct(props.id);
    data.then((x) => setProduct(x.product)).then(() => setLoading(false));
  }, [props.id]);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (product) {
    const { title, image, price, info } = product;
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
                    src={"/" + image}
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
    return <NotFoundPage />;
  }
}
