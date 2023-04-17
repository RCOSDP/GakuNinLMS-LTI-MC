import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SectionsTree, { type SectionsTreeProps } from "$molecules/SectionsTree";

type Props = SectionsTreeProps;

export default function SectionsTreeView(props: Props) {
  return (
    <TreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      disableSelection
    >
      <SectionsTree {...props} />
    </TreeView>
  );
}
