import React from 'react';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Zoom from 'react-img-zoom'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

import { useStyles} from '../styles/GridItemStyle.js';

export default function GridItem(props) {
  const classes = useStyles(props);
  const name = props.name;
  const price = props.price;
  const url = props.url;

  return (
    <Grid item xs={6} md={4} lg={3}>
      <Paper className={classes.paper} elevation={5}>
        <Grid container direction="column"  spacing={1} >
          <Grid item>
            <Typography gutterBottom >
              {name}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <ButtonBase className={classes.image} href="">
              <img className={classes.img} alt={name} src={process.env.PUBLIC_URL + url}/>
            </ButtonBase>
              {/*<Zoom  zoomScale={1.5} width={250} height={210} transitionTime={0} img={process.env.PUBLIC_URL + url}>*/}
          </Grid>
          <Grid container direction="row" justify="space-evenly">
            <Grid item xs={6}>
              <Typography gutterBottom >
                {price}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <ButtonBase>
                  <Typography>
                    Add to basket
                    <ShoppingBasketIcon className={classes.shoppingBasketIcon} />
                  </Typography>
              </ButtonBase>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  )
}
