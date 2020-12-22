export default { title: "molecules/BookTree" };

import BookTree from "./BookTree";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { book } from "$samples";

const props = {
  book,
  onItemClick(_: never, index: [number, number]) {
    console.log({ index });
  },
};

export const Default = () => (
  <TreeView
    defaultCollapseIcon={<ExpandMoreIcon />}
    defaultExpandIcon={<ChevronRightIcon />}
  >
    <BookTree {...props} />
  </TreeView>
);
