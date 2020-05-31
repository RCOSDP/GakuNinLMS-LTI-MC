import { ContentsWithState } from "components/contents";

export function EditContents(props: ContentsWithState) {
  return <pre>{JSON.stringify(props, null, 2) /* Debug */}</pre>;
}
