import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import LibraryAdd from "@material-ui/icons/LibraryAdd";
import { useRouter } from "./router";
import { Table } from "./Table";
import { MouseEvent, useCallback } from "react";
import { Column } from "material-table";
import { Videos, destroyVideo } from "./video";
import { useSnackbar } from "material-ui-snackbar-provider";

type VideosRow = {
  id: number;
  title: string;
  description: string;
};

export function VideosTable(props: Videos) {
  const router = useRouter();
  const newHandler = useCallback(() => {
    router.push({
      pathname: "/videos",
      query: {
        action: "new",
      },
    });
  }, [router]);
  const editHandler = useCallback(
    (event?: MouseEvent, row?: VideosRow | VideosRow[]) => {
      const video = Array.isArray(row) ? row[0] : row;
      if (video == null) return;
      router.push({
        pathname: "/videos",
        query: { id: video.id, action: "edit" },
      });
      event?.preventDefault();
    },
    [router]
  );
  const { showMessage } = useSnackbar();
  const destroyHandler = useCallback(
    async (event: MouseEvent, row: VideosRow | VideosRow[]) => {
      event.preventDefault();
      const contents = Array.isArray(row) ? row[0] : row;
      const res = confirm(`「${contents.title}」を削除しますか？`);
      if (!res) return;
      await destroyVideo(contents.id);
      showMessage(`「${contents.title}」を削除しました`);
    },
    [showMessage]
  );

  return (
    <Table
      title="ビデオ一覧"
      columns={
        [
          { title: "#", field: "id", width: "4rem" },
          {
            title: "名称",
            field: "title",
            width: "20%",
          },
          {
            title: "概要",
            field: "description",
          },
        ] as Column<VideosRow>[]
      }
      actions={[
        {
          tooltip: "編集する",
          icon: EditIcon,
          onClick: editHandler,
        },
        { tooltip: "削除する", icon: DeleteIcon, onClick: destroyHandler },
        {
          tooltip: "ビデオを追加する",
          icon: LibraryAdd,
          onClick: newHandler,
          isFreeAction: true,
        },
      ]}
      options={{
        actionsColumnIndex: -1,
      }}
      onRowClick={editHandler}
      data={props.videos}
    />
  );
}
