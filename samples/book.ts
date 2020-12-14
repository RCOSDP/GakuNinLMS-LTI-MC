import sections from "./sections";

const book = {
  id: 1,
  name: "コンピュータ・サイエンス",
  author: { name: "山田太郎" },
  createdAt: new Date(),
  updatedAt: new Date(),
  sections,
};

export default book;
