export default { title: "atoms/TreeItem" };

import TreeItem from "./TreeItem";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import IconButton from "@material-ui/core/IconButton";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";

export const Default = () => (
  <TreeView
    defaultCollapseIcon={<ExpandMoreIcon />}
    defaultExpandIcon={<ChevronRightIcon />}
  >
    <TreeItem
      nodeId="0"
      label={
        <>
          コンピュータ・サイエンス
          <IconButton size="small" color="primary">
            <EditOutlinedIcon />
          </IconButton>
        </>
      }
    >
      <TreeItem nodeId="1" label="1 情報のデジタルコンテンツ化">
        <TreeItem nodeId="1.1" label="1.1 リンゴに夢中のレッサーパンダ" />
        <TreeItem nodeId="1.2" label="1.2 やんちゃ盛り…1年前の円実" />
      </TreeItem>
      <TreeItem nodeId="2" label="2 デジタルとアナログの相違点" />
    </TreeItem>
  </TreeView>
);
