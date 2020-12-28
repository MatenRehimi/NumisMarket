import React, {useRef, useState} from "react";
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
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

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

export default function UpdateProfilePage() {
  const classes = useStyles();
  const {currentUser, updateEmail, updatePassword} = useAuth();

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      setOpen(true);
      return setError("Passwords do not match")
    }

    if (passwordRef.current.value.length < 6) {
      setOpen(true);
      return setError("Password must be 6 characters long")
    }

    const promises = [];
    setLoading(true);
    setError("");

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value))
    }

    Promise.all(promises).catch((error) => {
      setError(error.message);
      setLoading(false);
      setOpen(true);
    }).finally(() => {
      setLoading(false);
      if (error==="") {
        navigate("/")
      }
    })
  }

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
              Update Profile
            </Typography>
            <Snackbar  autoHideDuration={3000} open={open} onClose={() => setOpen(false)} >
              <MuiAlert elevation={6} variant="filled" onClose={() => setOpen(false)} severity="error" > 
                {error}
              </MuiAlert>
            </Snackbar>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>      
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
                    inputRef = {emailRef}
                  />
                </Grid>
                <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  placeholder="Leave blank to keep the same"
                  inputRef = {passwordRef}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  name="confirm-password"
                  label="Password Confirmation"
                  type="password"
                  id="confirm-password"
                  // autoComplete="current-password"
                  placeholder="Leave blank to keep the same"
                  inputRef = {passwordConfirmRef}
                />
              </Grid>
              </Grid>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={(e)=> handleSubmit(e)}
                disabled={loading}
              >
                UPDATE PROFILE
              </Button>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={()=> navigate("/profilePage")}
              >
                BACK TO PROFILE
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
