import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { useSessionAtom } from "$store/session";

function useAppBarOffset(): string {
  const { isInstructor } = useSessionAtom();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const trigger = useScrollTrigger();
  return !isInstructor || trigger ? "0" : matches ? "65px" : "55px";
}

export default useAppBarOffset;
