const sections = [
  {
    id: 1,
    name: "情報のデジタルコンテンツ化",
    topics: [
      {
        id: 1,
        name: "リンゴに夢中のレッサーパンダ",
      },
      {
        id: 2,
        name: "リンゴに夢中のレッサーパンダ",
      },
    ],
  },
  {
    id: 2,
    name: null,
    topics: [
      {
        id: 1,
        name: "リンゴに夢中のレッサーパンダ",
      },
    ],
  },
  {
    id: 3,
    name: "デジタルとアナログの相違点",
    topics: [],
  },
];

const book = {
  id: 1,
  name: "コンピュータ・サイエンス",
  author: { name: "山田太郎" },
  createdAt: new Date(),
  updatedAt: new Date(),
  sections,
};

const books = [...Array(3)].map((_value, index) => ({ ...book, id: index }));

const props = { books };

export default props;
