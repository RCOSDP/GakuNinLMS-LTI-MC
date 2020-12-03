import outdent from "outdent";

const resource = {
  id: 1,
  videoId: 1,
  url: "",
  details: {},
};

const topic = {
  id: 1,
  name: "リンゴに夢中のレッサーパンダ",
  description: outdent`円山動物園のレッサーパンダ

  2行目

  空行挟んで 4 行目

  空行 2 つ挟んで 7 行目

  半角空白文字だけの行を挟んで 9 行目

  　　　　

  全角空白文字だけの行を挟んで 11 行目

  実体参照テスト: &nbsp; てすと`,
  timeRequired: 60,
  creatorId: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
  details: {},
  resource,
};

const sections = [
  {
    id: 1,
    name: "情報のデジタルコンテンツ化",
    topics: [topic],
  },
  {
    id: 2,
    name: null,
    topics: [topic],
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

const props = { book };

export default props;
