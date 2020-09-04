import React from 'react';
import Grid from '@material-ui/core/Grid';
import GridItem from './GridItem.js';
import {useStyles} from '../styles/GridContainerStyle.js';

export default function ComplexGrid(props) {
  const classes = useStyles(props);
  //https://stackoverflow.com/questions/34688685/fluid-flexbox-grid-with-fixed-column-widths
  return (
    <div className={classes.root} >
      <Grid container spacing={0} width="100%" >
        <GridItem name={"£2 2007 Act of Union"} price={"£3.85"} url={"./coin.jpg"}/>
        <GridItem name={"£1 Capital cities-Edinburgh 2011"} price={"£1"} url={"./coin2.jpg"}/>
        <GridItem name={"2018 Flopsy Bunny"} price={"£8.95"} url={"./coin3.jpg"}/>
        <GridItem name={"2018 Mrs Titlemouse"} price={"£5.95"} url={"./coin4.jpg"} />
        <GridItem name={"£2 2017 Aviation"} price={"£22.00"} url={"./coin5.jpg"} />
        <GridItem name={"£2 2012 Charles Dickens"} price={"£3.85"} url={"./coin6.jpg"} />
        <GridItem name={"£2 2013 London underground roundEL"} price={"£7.50"} url={"./coin7.jpg"} />
        <GridItem name={"2016 Great Fire of London"} price={"£9.50"} url={"./coin8.jpg"} />
      </Grid>
    </div>
  );
}