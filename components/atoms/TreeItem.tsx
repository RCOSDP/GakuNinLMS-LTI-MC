import type { ComponentProps } from "react";
import MuiTreeItem from "@mui/lab/TreeItem";

type Props = ComponentProps<typeof MuiTreeItem>;

export default function TreeItem(props: Props) {
  return <MuiTreeItem {...props} />;
}
