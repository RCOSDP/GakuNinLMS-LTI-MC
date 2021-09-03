import ReactMarkdown from "react-markdown";
import { NormalComponents } from "react-markdown/lib/complex-types";
import gfm from "remark-gfm";
import breaks from "remark-breaks";
import Link from "@material-ui/core/Link";

// NOTE: 型に差異があるので変換
const MarkdownLink: NormalComponents["a"] = ({
  color: _,
  ref: legacyRef,
  ...props
}) => (
  <Link
    target="_blank"
    rel="noreferrer"
    // @ts-expect-error TODO: 文字列形式のrefは非推奨なので避けて
    ref={legacyRef}
    {...props}
  />
);

const components = {
  a: MarkdownLink,
} as const;

type Props = Pick<Parameters<typeof ReactMarkdown>[0], "children">;

export default function Markdown({ children }: Props) {
  return (
    <ReactMarkdown remarkPlugins={[gfm, breaks]} components={components}>
      {children}
    </ReactMarkdown>
  );
}
