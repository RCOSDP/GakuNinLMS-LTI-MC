import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import IconButton from "$atoms/IconButton";

type Props = Omit<Parameters<typeof IconButton>[0], "tooltipProps"> & {
  variant: "book" | "topic";
};

const label = {
  book: "ブック",
  topic: "トピック",
} as const;

export default function EditButton({ variant, ...other }: Props) {
  return (
    <IconButton
      tooltipProps={{ title: `${label[variant]}を編集` }}
      color="primary"
      size="small"
      {...other}
    >
      <EditOutlinedIcon />
    </IconButton>
  );
}
