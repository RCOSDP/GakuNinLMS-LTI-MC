export default { title: "templates/Books" };

import Books from "./Books";

const props = {
  books: [
    {
      name: "コンピュータ・サイエンス",
      author: { name: "山田太郎" },
      createdAt: new Date(),
      updatedAt: new Date(),
      sections: [
        {
          name: "情報のデジタルコンテンツ化",
          topics: [
            {
              name: "リンゴに夢中のレッサーパンダ",
            },
            {
              name: "リンゴに夢中のレッサーパンダ",
            },
          ],
        },
        {
          name: null,
          topics: [
            {
              name: "リンゴに夢中のレッサーパンダ",
            },
          ],
        },
        {
          name: "デジタルとアナログの相違点",
          topics: [],
        },
      ],
    },
    {
      name: "コンピュータ・サイエンス",
      author: { name: "山田太郎" },
      createdAt: new Date(),
      updatedAt: new Date(),
      sections: [
        {
          name: "情報のデジタルコンテンツ化",
          topics: [
            {
              name: "リンゴに夢中のレッサーパンダ",
            },
            {
              name: "リンゴに夢中のレッサーパンダ",
            },
          ],
        },
        {
          name: null,
          topics: [
            {
              name: "リンゴに夢中のレッサーパンダ",
            },
          ],
        },
        {
          name: "デジタルとアナログの相違点",
          topics: [],
        },
      ],
    },
  ],
};

export const Default = () => <Books {...props} />;
