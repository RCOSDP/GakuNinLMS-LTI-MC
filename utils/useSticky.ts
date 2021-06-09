import clsx from "clsx";
import useStickyStyles from "$styles/sticky";
import type { StickyProps } from "$styles/sticky";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";

function useSticky({ backgroundColor, offset, zIndex }: StickyProps) {
  const classes = useStickyStyles({
    backgroundColor,
    offset,
    zIndex,
  });
  const trigger = useScrollTrigger();
  return clsx(classes.sticky, { [classes.scroll]: trigger });
}

export default useSticky;
