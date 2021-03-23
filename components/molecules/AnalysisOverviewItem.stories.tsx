export default { title: "molecules/AnalysisOverviewItem" };

import AnalysisOverviewItem from "./AnalysisOverviewItem";
import { analysisOverview } from "$samples";

export const Default = () => (
  <AnalysisOverviewItem analysisOverview={analysisOverview} />
);
