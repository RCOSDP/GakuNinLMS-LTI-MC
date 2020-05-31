import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import LibraryAdd from "@material-ui/icons/LibraryAdd";
import { useRouter } from "components/router";
import { Table } from "./Table";
import { MouseEvent } from "react";
import { Column } from "material-table";
import { Videos } from "./video";

type VideosRow = {
  id: number;
  title: string;
};

export function VideosTable(props: Videos) {
  const router = useRouter();
  function rowClickHandler<T>(event?: MouseEvent, row?: T) {
    const video = Array.isArray(row) ? row[0] : row;
    router.push({
      pathname: "/videos",
      query: { id: video.id },
    });
    event?.preventDefault();
  }
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
          icon: PlayArrowIcon,
          tooltip: "再生する",
          onClick: rowClickHandler,
        },
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
      data={props.videos}
      onRowClick={rowClickHandler}
    />
  );
}
