export default { title: "templates/Analysis" };

import Analysis from "./Analysis";
import { session, books, analysisOverview, analysisDetail } from "$samples";

const handlers = {
  onAnalysisBookDownload: console.log,
  onLtiResourceClick: console.log,
  onBookClick: console.log,
};

export const Default = () => (
  <Analysis
    session={session}
    books={books}
    analysisBooks={[analysisOverview]}
    analysisTopics={[analysisOverview]}
    analysisUsers={[analysisDetail]}
    {...handlers}
  />
);
