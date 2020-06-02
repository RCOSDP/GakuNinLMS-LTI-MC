import { useCallback, useRef, useEffect } from "react";
import { Column } from "material-table";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import { Table } from "../Table";

export type VideosRow = {
  id: number;
  title: string;
  description: string;
};

export type VideosSelector = typeof VideosSelectorTable;

export function VideosSelectorTable(props: {
  rows: VideosRow[];
  onSelect: (row: VideosRow[]) => void;
}) {
  const tableRef = useRef<HTMLTableElement>(document.createElement("table"));
  useEffect(() => {
    // NOTE: Uncheck All
    // @ts-ignore
    tableRef.current.onAllSelected(false);
  }, [tableRef]);
  const onSelect = useCallback(
    (_: any, rows: VideosRow | VideosRow[]) => {
      props.onSelect(Array.isArray(rows) ? rows : [rows]);
    },
    [props.onSelect]
  );
  return (
    <Table
      tableRef={tableRef}
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
          tooltip: "選択されたビデオを追加します",
          icon: PlaylistAddCheckIcon,
          onClick: onSelect,
        },
      ]}
      options={{
        selection: true,
      }}
      data={props.rows}
    />
  );
}
