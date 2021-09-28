import { createTheme, adaptV4Theme } from "@mui/material/styles";
import { primary } from "./colors";

export default createTheme(
  adaptV4Theme({
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
  })
);
