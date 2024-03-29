import Link from "@mui/material/Link";
import Problem from "$organisms/Problem";

export default function EmbedProblem() {
  if (typeof window === "undefined") return null;

  return (
    <Problem title="このコンテンツは別ウィンドウで表示する必要があります">
      以下をクリックして、新しいウィンドウを表示してください。
      <p>
        <Link href={window.location.href} target="_blank">
          新しいウィンドウで開く
        </Link>
      </p>
    </Problem>
  );
}
