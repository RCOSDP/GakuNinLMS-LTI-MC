import { createTheme } from "@mui/material/styles";
import { primary, gray } from "./colors";

export default createTheme({
  palette: {
    primary: {
      light: primary[300],
      main: primary[500],
      dark: primary[700],
      contrastText: "#fff",
    },
    background: {
      default: gray[50],
    },
  },
  typography: {
    fontFamily: "sans-serif",
  },
});
