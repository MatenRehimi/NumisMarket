import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  image: {
    maxWidth: "100%",
    width: "100%",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "90%",
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  mainItem: {
    height: 300,
    width: 351,
  },
  shoppingBasketIcon: {
    height: 30,
    marginTop: theme.spacing(0.4),
    marginBottom: "auto",
  },

  price: {
    marginTop: "auto",
    marginBottom: "auto",
  },
}));

export { useStyles };
