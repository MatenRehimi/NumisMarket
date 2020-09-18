import React from "react";
import Grid from "@material-ui/core/Grid";
import GridItem from "./GridItem.js";
import { ProductConsumer } from "../context/ProductContext.js";
import { useStyles } from "../styles/GridContainerStyle.js";

export default function ProductGrid(props) {
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <Grid container spacing={0} width="100%">
        <ProductConsumer>
          {(value) => {
            console.log(value);
            console.log(value.products);
            return value.products.map((product) => {
              console.log(product);
              return <GridItem key={product.id} product={product} />;
            });
          }}
        </ProductConsumer>
      </Grid>
    </div>
  );
}
