import useStickyStyles from "$styles/sticky";
import type { StickyProps } from "$styles/sticky";
import { useSessionAtom } from "$store/session";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";

function useStickyProps({
  backgroundColor,
  top,
  zIndex,
  dialog = false,
}: StickyProps & { dialog?: boolean }) {
  const classes = useStickyStyles({
    backgroundColor,
    top,
    zIndex,
  });
  const trigger = useScrollTrigger();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const { isInstructor } = useSessionAtom();
  return {
    classes,
    scroll: trigger && !dialog,
    desktop: !trigger && !dialog && matches && isInstructor,
    mobile: !trigger && !dialog && !matches && isInstructor,
  };
}

export default useStickyProps;
