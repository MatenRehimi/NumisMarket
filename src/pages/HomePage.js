import React, { useEffect, useState } from "react";
import NavigationBar from "../components/NavigationBar.js";
import ProductGrid from "../components/ProductGrid.js";
import MetaTags from "react-meta-tags";
import Grid from "@material-ui/core/Grid";

async function getProducts() {
  const response = await fetch("/.netlify/functions/getProducts");
  const data = await response.json();
  return data;
}

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const data = getProducts();
    data
      .then((x) => x.data)
      .then((x) => setProducts(x))
      .then(() => setLoading(false));
  }, []);

  return (
    <div>
      {!loading && (
        <React.Fragment>
          <MetaTags>
            <meta name="viewport" content="width=device-width, initial-scale=0.8" />
          </MetaTags>
          <Grid container item>
            <NavigationBar isHomePage={true} setSearch={setSearch} />
            <ProductGrid products={products} search={search} />
          </Grid>
        </React.Fragment>
      )}
    </div>
  );
}
