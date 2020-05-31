import Edit from "@material-ui/icons/Edit";
import LibraryAdd from "@material-ui/icons/LibraryAdd";
import { useRouter } from "components/router";
import { isArray } from "util";
import { Table } from "./Table";
import { Column } from "material-table";

type VideosRow = {
  id: string;
  name: string;
  editable: boolean;
};

export function VideosTable(props: { data: VideosRow[] }) {
  const router = useRouter();

  return (
    <Table
      title="ビデオ一覧"
      columns={
        [
          { title: "#", field: "id", width: "4rem" },
          {
            title: "名称",
            field: "name",
            width: "20%",
          },
          {
            title: "概要",
            field: "description",
          },
        ] as Column<VideosRow>[]
      }
      actions={[
        (row) => ({
          icon: Edit,
          tooltip: "編集する",
          disabled: !row.editable,
          onClick: (e, row) => {
            router.push({
              pathname: "/videos",
              query: { id: (isArray(row) ? row[0] : row).id, action: "edit" },
            });
            e.preventDefault();
          },
        }),
        {
          icon: LibraryAdd,
          tooltip: "ビデオを追加する",
          isFreeAction: true,
          onClick: () =>
            router.push({
              pathname: "/videos",
              query: {
                action: "new",
              },
            }),
        },
      ]}
      options={{
        actionsColumnIndex: -1,
      }}
      data={props.data}
      onRowClick={(_, row) =>
        router.push({
          pathname: "/videos",
          query: { id: (isArray(row) ? row[0] : row).id },
        })
      }
    />
  );
}
