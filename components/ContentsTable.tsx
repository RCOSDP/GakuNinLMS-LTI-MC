import Edit from "@material-ui/icons/Edit";
import LibraryAdd from "@material-ui/icons/LibraryAdd";
import { useRouter } from "components/hooks";
import { isArray } from "util";
import { Table } from "./Table";
import { Column } from "material-table";

type ContentsRow = {
  id: string;
  name: string;
  editable: boolean;
};

export function ContentsTable(props: { data: ContentsRow[] }) {
  const router = useRouter();

  return (
    <Table
      title="学習コンテンツ一覧"
      columns={
        [
          { title: "#", field: "index", width: "4rem" },
          {
            title: "名称",
            field: "name",
          },
        ] as Column<ContentsRow>[]
      }
      actions={[
        (row) => ({
          icon: Edit,
          tooltip: "編集する",
          disabled: !row.editable,
          onClick: (_, row) =>
            router.push({
              pathname: "/contents",
              query: { id: (isArray(row) ? row[0] : row).id, action: "edit" },
            }),
        }),
        {
          icon: LibraryAdd,
          tooltip: "学習コンテンツを作成する",
          isFreeAction: true,
          onClick: () =>
            router.push({
              pathname: "/contents",
              query: {
                action: "new",
              },
            }),
        },
      ]}
      data={props.data}
    />
  );
}
