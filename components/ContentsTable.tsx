import LinkIcon from "@material-ui/icons/Link";
import Edit from "@material-ui/icons/Edit";
import LibraryAdd from "@material-ui/icons/LibraryAdd";
import { useRouter } from "components/router";
import { isArray } from "util";
import { Table } from "./Table";
import { Column } from "material-table";
import { registContents } from "./hooks";
import { MouseEvent } from "react";

type ContentsRow = {
  id: string;
  name: string;
  editable: boolean;
};

type ContentsSelectorRow = {
  id: string;
  name: string;
};

export function ContentsTable(props: { data: ContentsRow[] }) {
  const router = useRouter();
  function rowClickHandler<T>(event?: MouseEvent, row?: T) {
    const contents = isArray(row) ? row[0] : row;
    router.push({
      pathname: "/contents",
      query: { id: contents.id, action: "edit" },
    });
    event?.preventDefault();
  }
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
          onClick: rowClickHandler,
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
      options={{
        actionsColumnIndex: -1,
      }}
      onRowClick={rowClickHandler}
      data={props.data}
    />
  );
}

export function ContentsSelectorTable(props: {
  data: ReadonlyArray<ContentsSelectorRow>;
}) {
  const router = useRouter();
  function rowClickHandler<T>(event?: MouseEvent, row?: T) {
    const contents = isArray(row) ? row[0] : row;
    registContents(contents.id, contents.name);
    router.push("/contents");
    event?.preventDefault();
  }
  return (
    <Table
      title="学習コンテンツ一覧"
      columns={
        [
          { title: "#", field: "index", width: "calc(4rem - 48px)" },
          {
            title: "名称",
            field: "name",
          },
        ] as Column<ContentsSelectorRow>[]
      }
      actions={[
        {
          icon: LinkIcon,
          tooltip: "学習管理システムに紐付ける",
          onClick: rowClickHandler,
        },
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
      options={{
        actionsColumnIndex: 1,
      }}
      onRowClick={rowClickHandler}
      data={[...props.data]}
    />
  );
}
