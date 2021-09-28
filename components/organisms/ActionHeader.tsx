import { ComponentProps } from "react";
import clsx from "clsx";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import { gray } from "$theme/colors";
import useSticky from "$utils/useSticky";
import useAppBarOffset from "$utils/useAppBarOffset";
import extractNumberFromPx from "$utils/extractNumberFromPx";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(5),
  },
  title: {
    "& > *": {
      marginRight: theme.spacing(1),
    },
    "& > p": {
      paddingTop: theme.spacing(1),
    },
  },
  body: {
    paddingTop: theme.spacing(2),
  },
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
  title?: React.ReactNode;
  body?: React.ReactNode;
  action: React.ReactNode;
  considerAppBar?: boolean;
};

export default function ActionHeader(props: Props) {
  const { maxWidth, title, body, action, considerAppBar = true } = props;
  const classes = useStyles();
  const theme = useTheme();
  const appBarOffset = useAppBarOffset();
  const sticky = useSticky({
    backgroundColor: gray[50],
    offset: considerAppBar
      ? appBarOffset + extractNumberFromPx(theme.spacing(-2))
      : extractNumberFromPx(theme.spacing(-1)),
    zIndex: 2,
  });
  return (
    <>
      {(title || body) && (
        <div className={classes.root}>
          <Container
            className={clsx({ [classes.container]: !maxWidth })}
            maxWidth={maxWidth}
          >
            {title && (
              <Typography className={classes.title} variant="h4">
                {title}
              </Typography>
            )}
            {body && <div className={classes.body}>{body}</div>}
          </Container>
        </div>
      )}
      <Container
        className={clsx({ [classes.container]: !maxWidth }, sticky)}
        maxWidth={maxWidth}
      >
        <div className={classes.action}>{action}</div>
      </Container>
    </>
  );
}
