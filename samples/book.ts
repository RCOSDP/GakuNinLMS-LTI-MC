import ltiResourceLink from "./ltiResourceLink";
import user from "./user";
import sections from "./sections";

const book = {
  id: 1,
  name: "コンピュータ・サイエンス",
  description:
    "コンピュータ・サイエンスとはコンピューターと情報処理について研究する学問です。",
  language: "ja",
  timeRequired: null,
  shared: true,
  license: "",
  zoomMeetingId: null,
  authors: [{ ...user, roleName: "作成者" }],
  keywords: [{ id: 1, name: "科学・技術" }],
  ltiResourceLinks: [ltiResourceLink],
  createdAt: new Date(),
  publishedAt: new Date(),
  updatedAt: new Date(),
  sections,
  details: {},
};

export default book;
