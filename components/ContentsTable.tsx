import LinkIcon from "@material-ui/icons/Link";
import Edit from "@material-ui/icons/Edit";
import LibraryAdd from "@material-ui/icons/LibraryAdd";
import { Column } from "material-table";
import { useRouter } from "./router";
import { Table } from "./Table";
import { registContents } from "./api";
import { MouseEvent } from "react";
import { ContentsIndex } from "./contents";

// TODO:
function editable(_: any) {
  return true;
}

type ContentsRow = {
  id: number;
  title: string;
  editable?: boolean;
};

export function ContentsTable(props: ContentsIndex) {
  const router = useRouter();
  function rowClickHandler<T>(event?: MouseEvent, row?: T) {
    const contents = Array.isArray(row) ? row[0] : row;
    router.push({
      pathname: "/contents",
      query: { id: contents.id, action: "edit" },
    });
    event?.preventDefault();
  }
  const data = props.contents.map((contents) => ({
    ...contents,
    editable: editable(contents.creator),
  }));
  return (
    <Table
      title="学習コンテンツ一覧"
      columns={
        [
          { title: "#", field: "id", width: "4rem" },
          {
            title: "名称",
            field: "title",
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
      data={data}
    />
  );
}

export function ContentsSelectorTable(props: ContentsIndex) {
  const router = useRouter();
  function rowClickHandler<T>(event?: MouseEvent, row?: T) {
    const contents = Array.isArray(row) ? row[0] : row;
    registContents(contents.id, contents.name);
    router.push("/contents");
    event?.preventDefault();
  }
  const data = props.contents;
  return (
    <Table
      title="学習コンテンツ一覧"
      columns={
        [
          { title: "#", field: "id", width: "calc(4rem - 48px)" },
          {
            title: "名称",
            field: "title",
          },
        ] as Column<ContentsRow>[]
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
      data={data}
    />
  );
}
