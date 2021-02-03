import Link from "@material-ui/core/Link";
import { NEXT_PUBLIC_LMS_URL } from "$utils/env";
import Problem from "./Problem";

export default function BookNotFoundProblem() {
  return (
    <Problem title="ブックがありません">
      ブックが見つかりませんでした
      <br />
      <Link href={NEXT_PUBLIC_LMS_URL}>LMSに戻る</Link>
    </Problem>
  );
}
