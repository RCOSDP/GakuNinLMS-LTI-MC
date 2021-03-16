import Link from "@material-ui/core/Link";
import { useLmsUrl } from "$store/session";
import Problem from "./Problem";

export default function UnlinkedProblem() {
  const url = useLmsUrl();

  return (
    <Problem title="ブックが未連携です">
      ブックが配布されていません｡担当教員にお問い合わせください。
      {url && (
        <p>
          <Link href={url}>LMSに戻る</Link>
        </p>
      )}
    </Problem>
  );
}
