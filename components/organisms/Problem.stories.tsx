export default { title: "organisms/Problem" };

import Link from "@material-ui/core/Link";
import Problem from "./Problem";

export const Default = () => (
  <Problem title="ブックが未連携です">
    LTIリンクがどのブックとも連携されていません。担当教員にお問い合わせください
    <br />
    <Link href="#">LMSに戻る</Link>
  </Problem>
);
