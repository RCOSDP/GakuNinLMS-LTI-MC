import sections from "./sections";

const book = {
  id: 1,
  name: "コンピュータ・サイエンス",
  abstract: "",
  language: "ja",
  timeRequired: null,
  shared: true,
  author: { name: "山田太郎" },
  createdAt: new Date(),
  updatedAt: new Date(),
  sections,
};

export default book;
