import clsx from "clsx";
import { css } from "@emotion/css";
import { useTheme } from "@mui/material/styles";
import useScrollTrigger from "@mui/material/useScrollTrigger";

type Props = {
  backgroundColor?: string;
  offset?: string;
  zIndex?: number;
};

function useSticky({ backgroundColor, offset, zIndex }: Props) {
  const theme = useTheme();
  const classes = {
    sticky: css({
      zIndex,
      position: "sticky",
      top: offset,
      backgroundColor,
      transition: theme.transitions.create("top", {
        duration: theme.transitions.duration.enteringScreen,
        easing: theme.transitions.easing.easeOut,
      }),
    }),
    scroll: css({
      transition: theme.transitions.create("top", {
        duration: theme.transitions.duration.leavingScreen,
        easing: theme.transitions.easing.sharp,
      }),
    }),
  };
  const trigger = useScrollTrigger();
  return clsx(classes.sticky, { [classes.scroll]: trigger });
}

export default useSticky;
