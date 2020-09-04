import React from 'react';
import NavigationBar from './NavigationBar.js';
import GridContainer from './GridContainer.js';
import MetaTags from 'react-meta-tags';
import Grid from '@material-ui/core/Grid';

//https://www.youtube.com/watch?v=h99wHsM8pJE   <- linking to github and hosting
export default function HomePage() {

  document.body.style.margin = 0;

  return (
    <div >
      <MetaTags>
        <meta name="viewport" content="width=device-width, initial-scale=0.8" />
      </MetaTags>
      <Grid container>
        <Grid item>
          <NavigationBar isHomePage={true} />
          <GridContainer />
        </Grid>
      </Grid>
    </div>
  );

}
