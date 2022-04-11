import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import IconButton from "$atoms/IconButton";

const label = {
  start: "再生開始位置",
  end: "再生終了位置",
} as const;

type Props = Omit<Parameters<typeof IconButton>[0], "tooltipProps"> & {
  variant: keyof typeof label;
};

export default function SkipButton({ variant, ...other }: Props) {
  return (
    <IconButton
      tooltipProps={{
        title: `${label[variant]}に移動`,
      }}
      color="primary"
      size="small"
      {...other}
    >
      {variant === "start" && <SkipPreviousIcon />}
      {variant === "end" && <SkipNextIcon />}
    </IconButton>
  );
}
