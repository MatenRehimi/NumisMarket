import { makeStyles, withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

const useStyles = makeStyles((theme) => ({
  table: {
    marginLeft: "auto",
    marginRight: "auto",

    maxWidth: 1000,
  },
  quantityButton: {
    width: "50%",
  },
}));

const StyledTableCell = withStyles((theme) => ({
  root: {
    border: "2px solid rgb(253, 151, 39)",
  },
  head: {
    backgroundColor: theme.palette.warning.main,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
    backgroundColor: "rgb(255,255,255)",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.action.hover,
  },
}))(TableRow);

export { useStyles, StyledTableCell, StyledTableRow };
