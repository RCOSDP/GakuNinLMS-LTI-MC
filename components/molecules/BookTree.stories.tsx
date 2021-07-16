export default { title: "molecules/BookTree" };

import BookTree from "./BookTree";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { book } from "$samples";

const defaultProps = {
  book,
  onItemClick: console.log,
  onBookInfoClick: console.log,
};

export const Default = () => (
  <TreeView
    defaultCollapseIcon={<ExpandMoreIcon />}
    defaultExpandIcon={<ChevronRightIcon />}
  >
    <BookTree {...defaultProps} />
  </TreeView>
);

export const Editable = () => (
  <TreeView
    defaultCollapseIcon={<ExpandMoreIcon />}
    defaultExpandIcon={<ChevronRightIcon />}
  >
    <BookTree
      {...defaultProps}
      onItemEditClick={console.log}
      onBookEditClick={console.log}
    />
  </TreeView>
);

export const Selectable = () => (
  <TreeView
    defaultCollapseIcon={<ExpandMoreIcon />}
    defaultExpandIcon={<ChevronRightIcon />}
  >
    <BookTree {...defaultProps} onTreeChange={console.log} />
  </TreeView>
);
