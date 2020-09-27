import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: "#FD9727 !important",
      contrastText: "#fff",
    },
  },
});

export default function StyledButton(props) {
  return (
    <MuiThemeProvider theme={theme}>
      <Button
        color="secondary"
        variant="contained"
        onClick={props.onClick}
        fullWidth={props.fullWidth}
        className={props.className}
      >
        {props.message}
        {props.children}
      </Button>
    </MuiThemeProvider>
  );
}
