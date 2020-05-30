import Document, {
  DocumentContext,
  DocumentInitialProps,
  Html,
  Head,
  Main,
  NextScript,
} from "next/document";
import { ServerStyleSheets } from "@material-ui/styles";
import { mainTheme } from "components/theme";

export default class extends Document {
  static getInitialProps = async (ctx: DocumentContext) => {
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
      });
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: [initialProps.styles, sheets.getStyleElement()],
    } as DocumentInitialProps;
  };

  render() {
    return (
      <Html lang="ja" dir="ltr">
        <Head>
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <meta name="theme-color" content={mainTheme.palette.primary.main} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
