import App from "next/app";
import { MainTheme } from "components/theme";
import { StateProvider } from "components/state";

export default class extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <StateProvider>
        <MainTheme>
          <Component {...pageProps} />
        </MainTheme>
      </StateProvider>
    );
  }
}
