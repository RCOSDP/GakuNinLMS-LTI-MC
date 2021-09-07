export default { title: "molecules/SectionsTree" };

import SectionsTree from "./SectionsTree";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { sections } from "$samples";

const defaultProps = {
  sections,
  onItemClick: console.log,
};

export const Default = () => (
  <TreeView
    defaultCollapseIcon={<ExpandMoreIcon />}
    defaultExpandIcon={<ChevronRightIcon />}
  >
    <SectionsTree {...defaultProps} />
  </TreeView>
);

export const Editable = () => (
  <TreeView
    defaultCollapseIcon={<ExpandMoreIcon />}
    defaultExpandIcon={<ChevronRightIcon />}
  >
    <SectionsTree
      {...defaultProps}
      onItemEditClick={console.log}
      isTopicEditable={() => true}
    />
  </TreeView>
);

export const Selectable = () => (
  <TreeView
    defaultCollapseIcon={<ExpandMoreIcon />}
    defaultExpandIcon={<ChevronRightIcon />}
  >
    <SectionsTree {...defaultProps} onTreeChange={console.log} />
  </TreeView>
);
