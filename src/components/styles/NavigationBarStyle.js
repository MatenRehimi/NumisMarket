import { fade, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  appBarStyle: {
    background: "#2278CF",
  },
  logo: {
    marginRight: theme.spacing(1),
    fontSize: "2em",
  },
  title: {
    display: "block",
    fontSize: "1.5rem",
    [theme.breakpoints.up("sm")]: {
      fontSize: "3rem",
    },
    marginTop: "auto",
    marginBottom: "auto",
  },

  item1: {
    marginTop: "auto",
    marginBottom: "auto",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    alignItems: "center",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    //vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "100%",
    },
  },
  sectionDesktop: {
    padding: theme.spacing(1, 1, 1, 0), //creates consistent spacing between elements of UI
    display: "none",
    marginTop: "auto",
    marginBottom: "auto",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  shoppingBasketIcon: {
    marginLeft: theme.spacing(1),
  },
  basketButton: {
    marginRight: theme.spacing(1),
  },
  removeHyperLink: {
    color: "inherit",
    textDecoration: "none",
  },
}));

export { useStyles };
