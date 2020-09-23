import React, { useContext, useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { A } from "hookrouter";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import NavigationBar from "./NavigationBar";
import { AuthContext } from "../context/AuthContext";
import { navigate } from "hookrouter";

import { useStyles } from "../styles/SignInPageStyle.js";

const Copyright = (
  <Typography variant="body2" color="textSecondary" align="center">
    {"Copyright © "}
    <A color="inherit" href="http://localhost:3000/">
      NumisMarket
    </A>{" "}
    {new Date().getFullYear()}
    {"."}
  </Typography>
);

export default function SignInPage(props) {
  console.log("render");
  const classes = useStyles(props);
  const context = useContext(AuthContext);

  const [emailState, setEmailState] = useState("");
  const [passwordState, setPasswordState] = useState("");

  useEffect(() => {
    console.log("effect");
    console.log(context.token);
    if (context.token) {
      navigate("/");
    }
    if (context.error) {
      console.log(context.error);
    }
  }, [context.token, context.error]);

  function handleSubmit(e) {
    console.log("pop");
    e.preventDefault();
    context.login(emailState, passwordState);
  }

  return (
    <div>
      <NavigationBar isHomePage={false} />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={emailState}
              onChange={(e) => setEmailState(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={passwordState}
              onChange={(e) => setPasswordState(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <A href="/" variant="body2">
                  Forgot password?
                </A>
              </Grid>
              <Grid item>
                <A href="/SignUpPage" variant="body2">
                  Don't have an account? Sign Up
                </A>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>{Copyright}</Box>
      </Container>
    </div>
  );
}
