import { Contents } from "components/contents";

export function NewContents(props: Contents) {
  return <pre>{JSON.stringify(props, null, 2) /* Debug */}</pre>;
}
