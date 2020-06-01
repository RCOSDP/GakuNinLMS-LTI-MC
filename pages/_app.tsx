import App from "next/app";
import { AppThemeProvider } from "components/AppThemeProvider";
import { StateProvider } from "components/state";

export default class extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <StateProvider>
        <AppThemeProvider>
          <Component {...pageProps} />
        </AppThemeProvider>
      </StateProvider>
    );
  }
}
