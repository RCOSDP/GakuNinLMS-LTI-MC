import Link from "@material-ui/core/Link";
import Problem from "./Problem";

export default function EmbedProblem() {
  if (typeof window === "undefined") return null;

  return (
    <Problem title="このコンテンツは埋め込み表示できません">
      このコンテンツはフレーム内に埋め込み表示できません。新しいウィンドウで開いてください。
      <p>
        <Link href={window.location.href} target="_blank">
          新しいウィンドウで開く
        </Link>
      </p>
    </Problem>
  );
}
