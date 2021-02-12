import Link from "@material-ui/core/Link";
import { useLmsUrl } from "$store/session";
import Problem from "./Problem";

export default function BookNotFoundProblem() {
  const url = useLmsUrl();

  return (
    <Problem title="トピックがありません">
      トピックが見つかりませんでした
      {url && (
        <p>
          <Link href={url}>LMSに戻る</Link>
        </p>
      )}
    </Problem>
  );
}
