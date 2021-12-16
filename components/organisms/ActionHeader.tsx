import type { SxProps } from "@mui/system";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { gray } from "$theme/colors";
import useSticky from "$utils/useSticky";
import useAppBarOffset from "$utils/useAppBarOffset";
import sumPixels from "$utils/sumPixels";

type Props = {
  sx?: SxProps;
  children: React.ReactNode;
  considerAppBar?: boolean;
};

export default function ActionHeader(props: Props) {
  const { sx, children, considerAppBar = true } = props;
  const theme = useTheme();
  const appBarOffset = useAppBarOffset();
  const sticky = useSticky({
    backgroundColor: gray[50],
    offset: considerAppBar
      ? sumPixels(appBarOffset, theme.spacing(-2))
      : theme.spacing(-1),
    zIndex: 2,
  });
  return (
    <Box
      display="flex"
      alignItems="center"
      flexWrap="wrap"
      gap={2}
      sx={{
        // NOTE: actionにもたせたかったのはspacing(2)で、
        // 残りの余分なspacing(2)はstickyで張り付く際のネガティブマージン
        // See also https://github.com/npocccties/chibichilo/pull/243#issuecomment-785729721
        pt: 4,
        pb: 2,
        ...sx,
      }}
      className={sticky}
    >
      {children}
    </Box>
  );
}
