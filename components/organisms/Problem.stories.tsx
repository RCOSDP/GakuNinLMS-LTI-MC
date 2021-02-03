export default { title: "organisms/Problem" };

import Link from "@material-ui/core/Link";
import Problem from "./Problem";

export const Default = () => (
  <Problem title="ブックが未連携です">
    LTIリンクがどのブックとも連携されていません。担当教員にお問い合わせください
    <p>
      <Link href="#">LMSに戻る</Link>
    </p>
  </Problem>
);

// TODO: Please use <Provider> の問題の回避
function wrap(WrappedComponent: React.FC) {
  function Component() {
    return <WrappedComponent />;
  }
  return Component;
}

import UnlinkedProblem from "./UnlinkedProblem";
export const Unlinked = wrap(UnlinkedProblem);

import BookNotFoundProblem from "./BookNotFoundProblem";
export const BookNotFound = wrap(BookNotFoundProblem);

import TopicNotFoundProblem from "./TopicNotFoundProblem";
export const TopicNotFound = wrap(TopicNotFoundProblem);
