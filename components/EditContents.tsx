import { Contents } from "components/contents";

export function EditContents(props: Contents) {
  return <pre>{JSON.stringify(props, null, 2) /* Debug */}</pre>;
}
