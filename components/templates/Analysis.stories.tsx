export default { title: "templates/Analysis" };

import Analysis from "./Analysis";
import {
  books,
  ltiResourceLink,
  analysisOverview,
  analysisDetail,
} from "$samples";

const handlers = {
  onAnalysisBookDownload: console.log,
  onLtiResourceClick: console.log,
  onBookClick: console.log,
};

export const Default = () => (
  <Analysis
    books={books}
    ltiResources={[ltiResourceLink]}
    analysisBooks={[analysisOverview]}
    analysisTopics={[analysisOverview]}
    analysisUsers={[analysisDetail]}
    {...handlers}
  />
);
