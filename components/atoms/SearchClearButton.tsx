import IconButton from "$atoms/IconButton";
import CloseIcon from "@material-ui/icons/Close";

type Props = Omit<Parameters<typeof IconButton>[0], "tooltipProps">;

export default function SearchClearButton({ ...other }: Props) {
  return (
    <IconButton
      color="primary"
      size="small"
      {...other}
      tooltipProps={{ title: `検索を解除` }}
    >
      <CloseIcon />
    </IconButton>
  );
}
