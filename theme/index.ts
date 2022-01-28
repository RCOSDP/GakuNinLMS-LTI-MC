import { createTheme } from "@mui/material/styles";
import { primary, gray } from "./colors";
import { grey } from "@mui/material/colors";

export default createTheme({
  palette: {
    primary: {
      light: primary[300],
      main: primary[500],
      dark: primary[700],
      contrastText: "#fff",
    },
    secondary: {
      light: grey[500],
      main: grey[700],
      dark: gray[900],
    },
    background: {
      default: gray[50],
    },
  },
  typography: {
    fontFamily: "sans-serif",
  },
});
