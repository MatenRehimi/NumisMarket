import React from "react";
import Grid from "@material-ui/core/Grid";
import Product from "./Product.js";
import { useStyles } from "../styles/ProductGridStyle.js";
import { storeProducts } from "../data.js";

export default function ProductGrid(props) {
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <Grid container spacing={0} width={"auto"}>
        {storeProducts.map((product, index) => {
          return <Product product={product} key={product.id} />;
        })}
      </Grid>
    </div>
  );
}
