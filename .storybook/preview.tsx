import * as nextRouter from "next/router";
import { addDecorator } from "@storybook/react";
import { Provider } from "jotai";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { ConfirmProvider } from "material-ui-confirm";
import { SnackbarProvider } from "material-ui-snackbar-provider";
import theme from "../theme";
// NOTE: For VideoJs components.
import "video.js/dist/video-js.css";
import "videojs-seek-buttons/dist/videojs-seek-buttons.css";
import "../styles/video-js.css";

// NOTE: Mock useRouter
// @ts-expect-error
nextRouter.useRouter = () => ({ route: "/", query: {} });

addDecorator((story) => (
  <Provider>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ConfirmProvider>
        <SnackbarProvider SnackbarProps={{ autoHideDuration: 5e3 }}>
          <Container>{story()}</Container>
        </SnackbarProvider>
      </ConfirmProvider>
    </ThemeProvider>
  </Provider>
));
