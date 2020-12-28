import React, { useState, useRef } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { A} from "hookrouter";
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

export default function PasswordResetPage(props) {
  const classes = useStyles();
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  
  const emailRef = useRef();
  const {resetPassword} = useAuth();
  
  async function handleSubmit(e) {
    setLoading(true)
    setMessage("")
    
    await resetPassword(emailRef.current.value).then(() => {
      setMessage("Check your inbox for further instructions")
    }).catch((error)=> {
      setError(error.message)
    }).finally(() => {
      setLoading(false)
      setOpen(true)
    })
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
            Password Reset
          </Typography>
          <Snackbar  autoHideDuration={3000} open={open} onClose={() => setOpen(false)} >
            <MuiAlert elevation={6} variant="filled" onClose={() => setOpen(false)} severity={error ? "error" : "success"} > 
              {error ? error : message}
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={(e) => handleSubmit(e)}
              disabled={loading}
            >
              Reset Password
            </Button>
            <Grid container>
              <Grid item xs>
                <A href="/signInPage" variant="body2">
                  Login
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
