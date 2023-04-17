import Markdown from "react-markdown";
import gfm from "remark-gfm";
import strip from "strip-markdown";

type Props = {
  /** Markdown */
  content: string;
};

function StripedMarkdown({ content }: Props) {
  return (
    <Markdown
      remarkPlugins={[gfm, [strip, { keep: ["delete"] }]]}
      allowedElements={["del"]}
      unwrapDisallowed
    >
      {content}
    </Markdown>
  );
}

export default StripedMarkdown;
