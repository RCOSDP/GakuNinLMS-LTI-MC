import { createTheme } from "@mui/material/styles";
import { primary } from "./colors";

export default createTheme({
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
