import { Provider } from "jotai";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "$theme";
import AppBar from "$organisms/AppBar";
// NOTE: For VideoJs components.
import "video.js/dist/video-js.css";
import "videojs-seek-buttons/dist/videojs-seek-buttons.css";
import "$styles/video-js.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <Head>
        <title>ChibiCHiLO</title>
        <meta name="viewport" content="width=device-width" />
        <meta name="theme-color" content={theme.palette.primary.main} />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="sticky" />
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
