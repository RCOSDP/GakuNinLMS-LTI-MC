import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import IconButton from "$atoms/IconButton";

type Props = Omit<Parameters<typeof IconButton>[0], "tooltipProps"> & {
  variant: "book" | "topic";
};

const label = {
  book: "ブック",
  topic: "トピック",
} as const;

export default function PreviewButton({ variant, ...other }: Props) {
  return (
    <IconButton
      tooltipProps={{ title: `${label[variant]}をプレビュー` }}
      size="small"
      color="primary"
      {...other}
    >
      <VisibilityOutlinedIcon />
    </IconButton>
  );
}
