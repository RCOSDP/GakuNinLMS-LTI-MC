import Link from "@mui/material/Link";
import { useLmsUrl } from "$store/session";
import Problem from "$organisms/Problem";

export default function TopicNotFoundProblem() {
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
