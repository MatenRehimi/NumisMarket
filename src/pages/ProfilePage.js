import React from "react";
import {useAuth} from "../context/AuthContext"
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import NavigationBar from "../components/NavigationBar";
import { A, navigate } from "hookrouter";
import CircularProgress from '@material-ui/core/CircularProgress';

import { useStyles } from "./styles/SignUpPageStyle.js";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <A color="inherit" href="/">
        NumisMarket
      </A>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function ProfilePage() {
  const classes = useStyles();
  const {currentUser} = useAuth();

  if (!currentUser) {
      return (<div>
          <Container component="main">
          <CssBaseline />
            <div className={classes.paper}>
                <Typography>
                Loading
                </Typography>
                <CircularProgress />
            </div>
          </Container>
      </div>)
  }else{
    return (<div>
        <NavigationBar isHomePage={false} />
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
            <AccountCircle />
            </Avatar>
            <Typography component="h1" variant="h5">
              Profile
            </Typography>
            
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    defaultValue="need to do"
                    InputProps={{
                        readOnly: true,
                      }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    defaultValue="need to do"
                    InputProps={{
                        readOnly: true,
                      }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    defaultValue={currentUser ? currentUser.email : ""}
                    InputProps={{
                        readOnly: true,
                      }}
                  />
                </Grid>
              </Grid>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={()=> navigate("/updateProfilePage")}
              >
                Update Profile
              </Button>
            </form>
          </div>
          <Box mt={5}>
            <Copyright />
          </Box>
        </Container>
      </div>
    );
  }
      
    
}
