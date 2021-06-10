import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { useSessionAtom } from "$store/session";

function useAppBarOffset(): number {
  const { isInstructor } = useSessionAtom();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const trigger = useScrollTrigger();
  return !isInstructor || trigger ? 0 : matches ? 65 : 55;
}

export default useAppBarOffset;
