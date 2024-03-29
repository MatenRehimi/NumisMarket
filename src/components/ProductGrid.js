import React from "react";
import Grid from "@material-ui/core/Grid";
import Product from "./Product.js";
import { useStyles } from "./styles/ProductGridStyle.js";

export default function ProductGrid(props) {
  const classes = useStyles(props);
  const products = props.products;
  const search = props.search;
  const filteredProducts = products.filter((product) =>
    product.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  );

  return (
    <div className={classes.root}>
      <Grid container spacing={0} width={"auto"}>
        {filteredProducts.map((product) => {
          return <Product product={product} key={product.id} />;
        })}
      </Grid>
    </div>
  );
}
