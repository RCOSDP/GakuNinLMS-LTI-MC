import type { ComponentProps } from "react";
import clsx from "clsx";
import Container from "@mui/material/Container";
import { useTheme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import { gray } from "$theme/colors";
import useSticky from "$utils/useSticky";
import useAppBarOffset from "$utils/useAppBarOffset";
import sumPixels from "$utils/sumPixels";

const useStyles = makeStyles((theme) => ({
  action: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    // NOTE: actionにもたせたかったのはspacing(2)で、
    // 残りの余分なspacing(2)はstickyで張り付く際のネガティブマージン
    // See also https://github.com/npocccties/chibichilo/pull/243#issuecomment-785729721
    paddingTop: theme.spacing(4),
    "& > *": {
      marginRight: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  },
  container: {
    padding: 0,
  },
}));

type Props = Pick<ComponentProps<typeof Container>, "maxWidth"> & {
  children: React.ReactNode;
  considerAppBar?: boolean;
};

export default function ActionHeader(props: Props) {
  const { maxWidth, children, considerAppBar = true } = props;
  const classes = useStyles();
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
    <Container
      className={clsx({ [classes.container]: !maxWidth }, sticky)}
      maxWidth={maxWidth}
    >
      <div className={classes.action}>{children}</div>
    </Container>
  );
}
