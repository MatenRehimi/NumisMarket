import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  image: {
    maxWidth: "100%",
    width: "100%",
    height: 200,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  picture: {
    marginTop: theme.spacing(0),
    width: "100%",
    height: "auto",
    transitionTime: 0,
  },
  title: {
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(0),
    fontSize: "1.2rem",
    "@media (min-width:600px)": {
      fontSize: "1.5rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "1.75rem",
    },
  },

  price: {
    marginTop: theme.spacing(2),
    fontSize: "1.2rem",
    "@media (min-width:600px)": {
      fontSize: "1.5rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "1.75rem",
    },
  },

  addBasketButton: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(3),
  },
  backToProductsButton: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
}));

export { useStyles };
