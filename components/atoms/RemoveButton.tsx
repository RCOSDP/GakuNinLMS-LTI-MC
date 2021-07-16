import RemoveIcon from "@material-ui/icons/Remove";
import IconButton from "$atoms/IconButton";

type Props = Omit<Parameters<typeof IconButton>[0], "tooltipProps"> & {
  variant: "topic" | "section";
};

const label = {
  topic: "トピック",
  section: "セクション",
} as const;

export default function RemoveButton({ variant, ...other }: Props) {
  return (
    <IconButton
      color="primary"
      size="small"
      {...other}
      tooltipProps={{ title: `この${label[variant]}を取り除く` }}
    >
      <RemoveIcon />
    </IconButton>
  );
}
