import App from "next/app";
import { AppThemeProvider } from "components/AppThemeProvider";
import { StateProvider } from "components/state";
// NOTE: For VideoJs components.
import "video.js/dist/video-js.css";
import "videojs-seek-buttons/dist/videojs-seek-buttons.css";

export default class extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <StateProvider>
        <AppThemeProvider>
          <Component {...pageProps} />
          <footer>
            <a
              href={process.env.NEXT_PUBLIC_API_BASE_PATH}
              onClick={(e) => {
                e.preventDefault();
                sessionStorage.setItem("以前のバージョンを使う", "true");
                document.location.href = e.currentTarget.href;
              }}
              style={{
                position: "absolute",
                right: 0,
                bottom: 0,
              }}
            >
              以前のバージョンに戻す
            </a>
          </footer>
        </AppThemeProvider>
      </StateProvider>
    );
  }
}
