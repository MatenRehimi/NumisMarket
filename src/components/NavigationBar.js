import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { BasketConsumer } from "../context/BasketContext";
import { navigate } from "hookrouter";
import { useAuth } from "../context/AuthContext";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

import { useStyles } from "./styles/NavigationBarStyle";

export default function NavigationBar(props) {
  const isHomePage = props.isHomePage;
  const setSearch = props.setSearch;
  const classes = useStyles(props);
  const { signOut, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  //anchorEl is for the state of the account icon
  const [anchorEl, setAnchorEl] = React.useState(null);
  //mobileMoreAnchorEl is for the state of the opened window when account is clicked
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  //Actionlisteners

  //Fired when clicking account
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.target.value);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  //Fired when clicking off account menu when open
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  function profileClick(event) {
    handleMenuClose(event);
    navigate("/profilePage");
  }

  async function handleLogOut(event) {
    setError("");
    await signOut()
      .then(() => {
        handleMenuClose(event);
        navigate("/");
      })
      .catch((error) => {
        setError(error.message);
        setOpen(true);
      });
  }

  //Creating the buttons and attaching the listeners
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "center" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={(event) => profileClick(event)}>Profile</MenuItem>
      <MenuItem onClick={(event) => handleLogOut(event)}>Log out</MenuItem>
      <Snackbar autoHideDuration={3000} open={open} onClose={() => setOpen(false)}>
        <MuiAlert elevation={6} variant="filled" onClose={() => setOpen(false)} severity="error">
          {error}
        </MuiAlert>
      </Snackbar>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton color="inherit" onClick={() => navigate("/signInPage")}>
          <Typography>Register/Login</Typography>
        </IconButton>
      </MenuItem>

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar className={classes.appBarStyle} color="primary" position="static">
        <Toolbar>
          <IconButton onClick={() => navigate("/")} color="inherit">
            <MonetizationOnIcon className={classes.logo} />
            <Typography className={classes.title} variant="h4" noWrap>
              NumisMarket
            </Typography>
            {/* <img src={"/NumisMarket logo.png"} width={"220"} height={"70"} /> */}
          </IconButton>
          {isHomePage && (
            <React.Fragment>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  onChange={(e) => setSearch(e.target.value)}
                  inputProps={{ "aria-label": "search" }}
                />
              </div>
            </React.Fragment>
          )}
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {!currentUser && (
              <IconButton color="inherit" onClick={() => navigate("/signInPage")}>
                <Typography variant="h4" noWrap>
                  Login or Register
                </Typography>
              </IconButton>
            )}
            <IconButton
              onClick={() => navigate("/basketPage")}
              aria-label="show 3 items in basket"
              color="inherit"
            >
              <Typography variant="h4">Basket</Typography>
              <BasketConsumer>
                {(value) => {
                  return (
                    <Badge badgeContent={value.getBasketSize()} color="secondary">
                      <ShoppingBasketIcon style={{ fill: "white", width: 40, height: 35 }} />
                    </Badge>
                  );
                }}
              </BasketConsumer>
            </IconButton>
            {currentUser && (
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle style={{ width: 40, height: 35 }} />
              </IconButton>
            )}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {isHomePage ? (window.innerWidth <= 958 ? renderMobileMenu : null) : null}
      {isHomePage ? (window.innerWidth > 958 ? renderMenu : null) : null}
      {renderMenu}
    </div>
  );
}
