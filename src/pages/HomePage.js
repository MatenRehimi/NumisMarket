import React from "react";
import NavigationBar from "../components/NavigationBar.js";
import ProductGrid from "../components/ProductGrid.js";
import MetaTags from "react-meta-tags";
import Grid from "@material-ui/core/Grid";

export default function HomePage() {
  return (
    <div>
      <MetaTags>
        <meta name="viewport" content="width=device-width, initial-scale=0.8" />
      </MetaTags>
      <Grid container item>
        <NavigationBar isHomePage={true} />
        <ProductGrid />
      </Grid>
    </div>
  );
}