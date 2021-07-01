import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import breaks from "remark-breaks";
import Link from "@material-ui/core/Link";
import type { LinkProps } from "@material-ui/core/Link";

function MarkdownLink<Element extends React.ElementType>(
  props: LinkProps<Element>
) {
  return <Link target="_blank" rel="noreferrer" {...props} />;
}

type Props = Pick<Parameters<typeof ReactMarkdown>[0], "children">;

export default function Markdown({ children }: Props) {
  const components = {
    a: MarkdownLink,
  };
  return (
    <ReactMarkdown remarkPlugins={[gfm, breaks]} components={components}>
      {children}
    </ReactMarkdown>
  );
}
