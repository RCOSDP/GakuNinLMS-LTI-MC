import { addDecorator } from "@storybook/react";
import { Provider } from "jotai";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import theme from "../theme";
// NOTE: For VideoJs components.
import "video.js/dist/video-js.css";
import "videojs-seek-buttons/dist/videojs-seek-buttons.css";
import "../styles/video-js.css";

addDecorator((story) => (
  <Provider>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>{story()}</Container>
    </ThemeProvider>
  </Provider>
));
