export default { title: "organisms/CollapsibleContent" };

import CollapsibleContent from "./CollapsibleContent";

export const Default = () => (
  <CollapsibleContent label="ラベル" expanded>
    中身
  </CollapsibleContent>
);
