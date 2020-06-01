import { Contents } from "./contents";

export function ShowContents(props: Contents) {
  return <pre>{JSON.stringify(props, null, 2) /* Debug */}</pre>;
}
