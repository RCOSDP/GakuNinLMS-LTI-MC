import MuiIconButton, { IconButtonProps } from "@material-ui/core/IconButton";
import Tooltip, { TooltipProps } from "@material-ui/core/Tooltip";

type Props = IconButtonProps & {
  tooltipProps: Omit<TooltipProps, "children">;
};

export default function IconButton(props: Props) {
  const { tooltipProps, ...others } = props;
  return (
    <Tooltip {...tooltipProps}>
      <MuiIconButton {...others} />
    </Tooltip>
  );
}
