import MuiIconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

type Props = Parameters<typeof MuiIconButton>[0] & {
  tooltipProps: Omit<Parameters<typeof Tooltip>[0], "children">;
};

export default function IconButton(props: Props) {
  const { tooltipProps, ...others } = props;
  return (
    <Tooltip {...tooltipProps}>
      <MuiIconButton {...others} />
    </Tooltip>
  );
}
