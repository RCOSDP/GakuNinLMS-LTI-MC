import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import LibraryAdd from "@material-ui/icons/LibraryAdd";
import LinkIcon from "@material-ui/icons/Link";
import { Column } from "material-table";
import { useRouter } from "./router";
import { Table } from "./Table";
import { registContents } from "./api";
import { MouseEvent, useCallback } from "react";
import { ContentsIndex, destroyContents } from "./contents";
import { useSnackbar } from "material-ui-snackbar-provider";

// TODO:
function editable(_: any) {
  return true;
}

type ContentsRow = {
  id: number;
  title: string;
  editable?: boolean;
};

function contentsHandler(contents: ContentsIndex["contents"]): ContentsRow[] {
  return contents.map((contents) => ({
    ...contents,
    editable: editable(contents.creator),
  }));
}

export function ContentsTable(props: ContentsIndex) {
  const router = useRouter();
  const showHandler = useCallback(
    (event?: MouseEvent, row?: ContentsRow | ContentsRow[]) => {
      const contents = Array.isArray(row) ? row[0] : row;
      if (contents == null) return;
      router.push({
        pathname: "/contents",
        query: {
          id: contents.id,
          action: "show",
        },
      });
      event?.preventDefault();
    },
    [router]
  );
  const newHandler = useCallback(() => {
    router.push({
      pathname: "/contents",
      query: {
        action: "new",
      },
    });
  }, [router]);
  const editHandler = useCallback(
    (event: MouseEvent, row: ContentsRow | ContentsRow[]) => {
      event.preventDefault();
      if (!row) return;
      if (Array.isArray(row)) return;
      router.push({
        pathname: "/contents",
        query: { id: row.id, action: "edit" },
      });
    },
    [router]
  );
  const { showMessage } = useSnackbar();
  const destroyHandler = useCallback(
    async (event: MouseEvent, row: ContentsRow | ContentsRow[]) => {
      event.preventDefault();
      const contents = Array.isArray(row) ? row[0] : row;
      const res = confirm(`「${contents.title}」を削除しますか？`);
      if (!res) return;
      await destroyContents(contents.id);
      showMessage(`「${contents.title}」を削除しました`);
    },
    [showMessage]
  );

  const editAction = useCallback(
    (row: ContentsRow) => ({
      icon: EditIcon,
      tooltip: "編集する",
      disabled: !row.editable,
      onClick: editHandler,
    }),
    [editHandler]
  );
  const destroyAction = useCallback(
    (row: ContentsRow) => ({
      tooltip: "削除する",
      icon: DeleteIcon,
      editable: !row.editable,
      onClick: destroyHandler,
    }),
    [destroyHandler]
  );

  const data = contentsHandler(props.contents);
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
        editAction,
        destroyAction,
        {
          icon: LibraryAdd,
          tooltip: "学習コンテンツを作成する",
          isFreeAction: true,
          onClick: newHandler,
        },
      ]}
      options={{
        actionsColumnIndex: -1,
      }}
      onRowClick={showHandler}
      data={data}
    />
  );
}

export function ContentsSelectorTable(props: ContentsIndex) {
  const router = useRouter();
  function rowClickHandler(
    event?: MouseEvent,
    row?: ContentsRow | ContentsRow[]
  ) {
    const contents = Array.isArray(row) ? row[0] : row;
    if (contents == null) return;
    registContents(contents.id, contents.title);
    // TODO: ホントは紐づけた先に戻りたい
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
