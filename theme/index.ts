import { createMuiTheme } from "@material-ui/core/styles";
import { primary } from "./colors";

export default createMuiTheme({
  palette: {
    primary: {
      light: primary[300],
      main: primary[500],
      dark: primary[700],
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: "sans-serif",
  },
});
