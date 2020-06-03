export default { title: "ContentsTable" };
import { ContentsTable } from "./ContentsTable";
import { ContentsIndex } from "./contents";

const props: ContentsIndex = {
  contents: [1, 5, 8, 9].map((id) => ({
    id,
    title: `Sample Contents ${id}`,
    creator: `user ${id}`,
    updateAt: new Date(),
  })),
  state: "success",
};

export function Basic() {
  return <ContentsTable {...props} />;
}
