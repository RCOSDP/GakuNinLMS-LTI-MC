import Link from "@material-ui/core/Link";
import { NEXT_PUBLIC_LMS_URL } from "$utils/env";
import Problem from "./Problem";

export default function UnlinkedProblem() {
  return (
    <Problem title="ブックが未連携です">
      LTIリンクがどのブックとも連携されていません。担当教員にお問い合わせください
      <br />
      <Link href={NEXT_PUBLIC_LMS_URL}>LMSに戻る</Link>
    </Problem>
  );
}
