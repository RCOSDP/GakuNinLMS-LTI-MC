export default { title: "organisms/TopicPlayer" };

import TopicPlayer from "./TopicPlayer";
import bookProps from "samples/bookProps";

const {
  book: {
    sections: [
      {
        topics: [props],
      },
    ],
  },
} = bookProps;

export const Default = () => <TopicPlayer {...props} />;
