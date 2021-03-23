export default { title: "molecules/AnalysisDetailItem" };

import AnalysisDetailItem from "./AnalysisDetailItem";
import { analysisDetail } from "$samples";

export const Default = () => (
  <AnalysisDetailItem analysisDetail={analysisDetail} />
);
