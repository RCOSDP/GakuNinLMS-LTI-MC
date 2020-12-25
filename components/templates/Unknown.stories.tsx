export default { title: "templates/BookUnknown" };

import Unknown from "./Unknown";

export const Default = () => (
  <Unknown header="ブックが未連携です">
    LTIリンクがどのブックとも連携されていません。担当教員にお問い合わせください
  </Unknown>
);
