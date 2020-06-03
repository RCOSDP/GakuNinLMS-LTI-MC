import * as nextRouter from "next/router";
import { addDecorator } from "@storybook/react";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { SnackbarProvider } from "material-ui-snackbar-provider";
import { theme } from "../components/theme";

// NOTE: Mock useRouter
// @ts-ignore
nextRouter.useRouter = () => ({ route: "/" });

addDecorator((story) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <SnackbarProvider>
      <Container>{story()}</Container>
    </SnackbarProvider>
  </ThemeProvider>
));
