export default { title: "templates/Book" };

import { useAtom } from "jotai";
import { nextItemIndexAtom } from "$store/book";
import Book from "./Book";
import props from "samples/bookProps";

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
