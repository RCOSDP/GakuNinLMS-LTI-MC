export default { title: "templates/Book" };

import { useAtom } from "jotai";
import { nextItemIndexAtom } from "$store/book";
import Book from "./Book";
import { book } from "samples";

const props = { book };

// TODO: Please use <Provider> の問題の回避。なぜか回避できる。
function wrap(WrappedComponent: React.FC) {
  function Component() {
    return <WrappedComponent />;
  }
  return Component;
}

export const Default = wrap(() => {
  const [index, nextItemIndex] = useAtom(nextItemIndexAtom);
  const handleTopicEnded = () => nextItemIndex();
  const handleItemClick = nextItemIndex;

  return (
    <Book
      {...props}
      index={index}
      onTopicEnded={handleTopicEnded}
      onItemClick={handleItemClick}
    />
  );
});

export const Empty = wrap(() => {
  const [index, nextItemIndex] = useAtom(nextItemIndexAtom);
  const handleTopicEnded = () => nextItemIndex();
  const handleItemClick = nextItemIndex;

  return (
    <Book
      book={null}
      index={index}
      onTopicEnded={handleTopicEnded}
      onItemClick={handleItemClick}
    />
  );
});
