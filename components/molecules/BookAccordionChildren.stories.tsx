export default { title: "molecules/BookAccordionChildren" };

import BookAccordionChildren from "./BookAccordionChildren";

const props = {
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
};

export const Default = () => {
  return (
    <div>
      <BookAccordionChildren {...props} />
    </div>
  );
};
