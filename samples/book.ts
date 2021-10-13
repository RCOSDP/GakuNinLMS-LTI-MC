import ltiResourceLink from "./ltiResourceLink";
import user from "./user";
import sections from "./sections";

const book = {
  id: 1,
  name: "コンピュータ・サイエンス",
  description: "",
  language: "ja",
  timeRequired: null,
  shared: true,
  authors: [{ ...user, roleName: "著者" }],
  ltiResourceLinks: [ltiResourceLink],
  createdAt: new Date(),
  publishedAt: new Date(),
  updatedAt: new Date(),
  sections,
  details: {},
};

export default book;
