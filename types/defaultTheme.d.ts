import type { Theme } from "@mui/material/styles";

// NOTE: https://mui.com/guides/migration-v4/#types-property-quot-palette-quot-quot-spacing-quot-does-not-exist-on-type-defaulttheme
declare module "@mui/styles/defaultTheme" {
  interface DefaultTheme extends Theme {}
}
