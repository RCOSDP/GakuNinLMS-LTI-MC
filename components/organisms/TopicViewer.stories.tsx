export default { title: "organisms/TopicViewer" };

import TopicPlayer from "./TopicViewer";
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
