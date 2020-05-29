import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { blue, deepOrange } from "@material-ui/core/colors";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import MuiLink from "@material-ui/core/Link";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import React, { ReactNode } from "react";
import NextLink from "next/link";
import Head from "next/head";
import * as config from "next.config.js";
import { UrlObject, format } from "url";
import { useAppState } from "./state";
import { validUrl } from "./url";

export const theme = createMuiTheme({
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
});

export const Link = (props: {
  href: string | UrlObject;
  children: ReactNode;
}) => {
  const url =
    validUrl(props.href)?.href ??
    (typeof props.href === "string"
      ? `${config.experimental.basePath}${props.href}.html`
      : format({
          ...props.href,
          pathname: `${config.experimental.basePath}${props.href.pathname}.html`,
        }));

  return (
    <NextLink href={props.href} as={url}>
      <MuiLink variant="body1" href={url}>
        {props.children}
      </MuiLink>
    </NextLink>
  );
};

export const TopAppBar = (props: { title: string }) => (
  <AppBar>
    <Toolbar>
      <Typography variant="h6" color="inherit">
        {props.title}
      </Typography>
    </Toolbar>
  </AppBar>
);

export const MainTheme = (props: { children: ReactNode }) => {
  const title = useAppState().title || "学習コンテンツ";

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>{title}</title>
      </Head>
      <CssBaseline />
      <TopAppBar title={title} />
      <Box pt={12} component={Container}>
        {props.children}
      </Box>
    </ThemeProvider>
  );
};
