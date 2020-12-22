import { ComponentProps } from "react";
import MuiTreeItem from "@material-ui/lab/TreeItem";

type Props = ComponentProps<typeof MuiTreeItem>;

export default function TreeItem(props: Props) {
  return <MuiTreeItem {...props} />;
}
