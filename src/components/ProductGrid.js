import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Product from "./Product.js";
import { useStyles } from "./styles/ProductGridStyle.js";

async function getProducts() {
  const response = await fetch("/.netlify/functions/getProducts");
  const data = await response.json();
  return data;
}

export default function ProductGrid(props) {
  const classes = useStyles(props);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = getProducts();
    data
      .then((x) => x.data)
      .then((x) => setProducts(x))
      .then(() => setLoading(false));
  }, []);

  return (
    <div className={classes.root}>
      {!loading && (
        <Grid container spacing={0} width={"auto"}>
          {products.map((product, index) => {
            return <Product product={product} key={product.id} />;
          })}
        </Grid>
      )}
    </div>
  );
}
