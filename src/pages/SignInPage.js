import React, { useState, useRef } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { A, navigate } from "hookrouter";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import NavigationBar from "../components/NavigationBar";
import { useAuth } from "../context/AuthContext";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

import { useStyles } from "./styles/SignInPageStyle.js";

const Copyright = (
  <Typography variant="body2" color="textSecondary" align="center">
    {"Copyright © "}
    <A color="inherit" href="/">
      NumisMarket
    </A>{" "}
    {new Date().getFullYear()}
    {"."}
  </Typography>
);

export default function SignInPage(props) {
  const { signIn } = useAuth();
  const classes = useStyles(props);
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    await signIn(emailRef.current.value, passwordRef.current.value)
      .then(() => {
        setLoading(false);
        setOpen(true);
        navigate("/");
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
        setOpen(true);
      });
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
          <Snackbar
            autoHideDuration={3000}
            open={open}
            onClose={() => setOpen(false)}
          >
            <MuiAlert
              elevation={6}
              variant="filled"
              onClose={() => setOpen(false)}
              severity="error"
            >
              {error}
            </MuiAlert>
          </Snackbar>
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
              inputRef={emailRef}
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
              inputRef={passwordRef}
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
              onClick={(e) => handleSubmit(e)}
              disabled={loading}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <A href="/passwordResetPage" variant="body2">
                  Forgot password?
                </A>
              </Grid>
              <Grid item>
                <A href="/signUpPage" variant="body2">
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
