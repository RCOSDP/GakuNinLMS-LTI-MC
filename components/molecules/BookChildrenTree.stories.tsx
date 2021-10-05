export default { title: "molecules/BookChildrenTree" };

import BookChildrenTree from "./BookChildrenTree";
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
    <BookChildrenTree {...defaultProps} />
  </TreeView>
);

export const Editable = () => (
  <TreeView
    defaultCollapseIcon={<ExpandMoreIcon />}
    defaultExpandIcon={<ChevronRightIcon />}
  >
    <BookChildrenTree
      {...defaultProps}
      onItemEditClick={console.log}
      isContentEditable={() => true}
    />
  </TreeView>
);

export const Selectable = () => (
  <TreeView
    defaultCollapseIcon={<ExpandMoreIcon />}
    defaultExpandIcon={<ChevronRightIcon />}
  >
    <BookChildrenTree {...defaultProps} onTreeChange={console.log} />
  </TreeView>
);
