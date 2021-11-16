import MuiIconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

type Props = Parameters<typeof MuiIconButton>[0] & {
  tooltipProps: Omit<Parameters<typeof Tooltip>[0], "children">;
};

export default function IconButton(props: Props) {
  const { tooltipProps, disabled, ...others } = props;
  // NOTE: MUI: You are providing a disabled `button` child to the Tooltip component. への対処
  if (disabled) return <MuiIconButton disabled {...others} />;
  else
    return (
      <Tooltip {...tooltipProps}>
        <MuiIconButton {...others} />
      </Tooltip>
    );
}
