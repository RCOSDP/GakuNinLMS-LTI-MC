import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import Edit from "@material-ui/icons/Edit";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import LibraryAdd from "@material-ui/icons/LibraryAdd";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import MaterialTable, { Column } from "material-table";
import { useRouter } from "components/hooks";
import { isArray } from "util";

type Row = {
  id: string;
  name: string;
  description: string;
  editable: boolean;
};

type Table = Array<Row>;

const column = {
  index: { title: "#", field: "index", width: "4rem" },
  name: {
    title: "名称",
    field: "name",
    width: "20%",
  },
  description: {
    title: "概要",
    field: "description",
  },
};

function withIndex<T>(data: T[]) {
  return data.map((e, index) => ({ ...e, index: index + 1 /* one-based */ }));
}

export function VideosTable(props: { data: Table }) {
  const router = useRouter();

  const title = "ビデオ一覧";
  const columns: Column<Row>[] = [
    column.index,
    column.name,
    column.description,
  ].map((c) => ({
    ...c,
    headerStyle: { padding: 0 },
    cellStyle: {
      padding: 0,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  }));

  return (
    <MaterialTable
      title={title}
      columns={columns}
      localization={{
        header: {
          actions: "",
        },
      }}
      components={{ Container: (props) => <div {...props} /> }}
      data={withIndex(props.data)}
      actions={[
        (row) => ({
          icon: Edit,
          tooltip: "編集する",
          disabled: !row.editable,
          onClick: (_, row) =>
            router.push({
              pathname: "/videos",
              query: { id: (isArray(row) ? row[0] : row).id, action: "edit" },
            }),
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
        sorting: true,
        tableLayout: "fixed",
        rowStyle: { height: 49 },
        pageSize: 50,
        pageSizeOptions: ((opts, rows) => {
          const i = opts.findIndex((n) => rows <= n);
          return opts.slice(0, i >= 0 ? i + 1 : opts.length);
        })([50, 100], props.data.length),
        actionsColumnIndex: -1,
        actionsCellStyle: { padding: 0 },
      }}
      icons={
        {
          Clear,
          FirstPage,
          LastPage,
          NextPage: ChevronRight,
          PreviousPage: ChevronLeft,
          ResetSearch: Clear,
          Search,
          SortArrow: ArrowDownward,
          Export: SaveAlt,
        } as any
      }
    />
  );
}
