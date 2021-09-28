import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { useSessionAtom } from "$store/session";

function useAppBarOffset(): number {
  const { isInstructor } = useSessionAtom();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const trigger = useScrollTrigger();
  return !isInstructor || trigger ? 0 : matches ? 65 : 55;
}

export default useAppBarOffset;
