import React from "react";
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

import { useStyles } from "../styles/NavigationBarStyle.js";

export default function NavigationBar(props) {
  const isHomePage = props.isHomePage;
  const classes = useStyles(props);

  //anchorEl is for the state of the account icon
  const [anchorEl, setAnchorEl] = React.useState(null);
  //mobileMoreAnchorEl is for the state of the opened window when account is clicked
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  //Actionlisteners

  //Fired when clicking account
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
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
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
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
        <IconButton color="inherit" href="/SignInPage">
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
          <IconButton color="inherit" href="/">
            <MonetizationOnIcon className={classes.logo} />
            <Typography className={classes.title} variant="h4" noWrap>
              NumisMarket
            </Typography>
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
                  inputProps={{ "aria-label": "search" }}
                />
              </div>
              <div className={classes.grow} />
              <div className={classes.sectionDesktop}>
                <IconButton
                  color="inherit"
                  href="/SignInPage"
                  onClick={() => console.log("pop")}
                >
                  <Typography variant="h5" noWrap>
                    Login or Register
                  </Typography>
                </IconButton>
                <IconButton aria-label="show 3 items in basket" color="inherit">
                  Basket
                  <Badge badgeContent={3} color="secondary">
                    <ShoppingBasketIcon style={{ fill: "white" }} />
                  </Badge>
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
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
            </React.Fragment>
          )}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
