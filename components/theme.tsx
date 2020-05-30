import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { blue, deepOrange } from "@material-ui/core/colors";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import { ReactNode, useMemo } from "react";
import { usePopupState, bindTrigger } from "material-ui-popup-state/hooks";
import { SnackbarProvider } from "material-ui-snackbar-provider";
import Head from "next/head";
import { TopAppMenu } from "./TopAppMenu";
import { useAppState } from "./state";
import { useShowRegistContents } from "./hooks";

export const mainTheme = {
  palette: {
    primary: {
      main: blue[800],
    },
    secondary: {
      main: deepOrange[500],
    },
  },
  typography: {
    fontFamily: "sans-serif",
  },
};

function Title(props: { children: ReactNode }) {
  return <Typography component="h1" variant="h6" color="inherit" {...props} />;
}

export const TopAppBar = (props: { title: string }) => {
  useShowRegistContents();
  const popupState = usePopupState({
    variant: "popover",
    popupId: "TopAppMenu",
  });

  return (
    <AppBar>
      <Toolbar>
        <Button
          startIcon={<MenuIcon />}
          color="inherit"
          size="large"
          style={{ marginRight: 24 }}
          {...bindTrigger(popupState)}
        >
          メニュー
        </Button>
        <TopAppMenu popupState={popupState} />
        <Box flexGrow={1} component={Title} children={props.title} />
      </Toolbar>
    </AppBar>
  );
};

export const MainTheme = (props: { children: ReactNode }) => {
  const prefersDarkMode = true; // TODO: useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useMemo(
    () =>
      createMuiTheme({
        ...mainTheme,
        palette: {
          ...mainTheme.palette,
          type: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );
  const title = useAppState().title;
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>{title}</title>
      </Head>
      <CssBaseline />
      <SnackbarProvider SnackbarProps={{ autoHideDuration: 5e3 }}>
        <TopAppBar title={title} />
        <Box pt={12} component={Container}>
          {props.children}
        </Box>
      </SnackbarProvider>
    </ThemeProvider>
  );
};
