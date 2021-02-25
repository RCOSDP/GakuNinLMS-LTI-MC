import { ComponentProps } from "react";
import clsx from "clsx";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import { gray } from "theme/colors";

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
  action: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    // NOTE: actionにもたせたかったのはspacing(2)で、
    // 残りの余分なspacing(2)はstickyで張り付く際のネガティブマージン
    // See also https://github.com/npocccties/ChibiCHiLO/pull/243#issuecomment-785729721
    paddingTop: theme.spacing(4),
    "& > *": {
      marginRight: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  },
  container: {
    padding: 0,
  },
  sticky: {
    zIndex: 1,
    position: "sticky",
    backgroundColor: gray[50],
    transition: theme.transitions.create("top", {
      duration: theme.transitions.duration.enteringScreen,
      easing: theme.transitions.easing.easeOut,
    }),
  },
  scroll: {
    top: -theme.spacing(2),
    transition: theme.transitions.create("top", {
      duration: theme.transitions.duration.leavingScreen,
      easing: theme.transitions.easing.sharp,
    }),
  },
  desktop: {
    top: 65 - theme.spacing(2),
  },
  mobile: {
    top: 55 - theme.spacing(2),
  },
}));

type Props = Pick<ComponentProps<typeof Container>, "maxWidth"> & {
  title: React.ReactNode;
  action: React.ReactNode;
};

export default function ActionHeader(props: Props) {
  const { maxWidth, title, action } = props;
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const trigger = useScrollTrigger();
  return (
    <>
      <div className={classes.root}>
        <Container
          className={clsx({ [classes.container]: !maxWidth })}
          maxWidth={maxWidth}
        >
          <Typography className={classes.title} variant="h4">
            {title}
          </Typography>
        </Container>
      </div>
      {action && (
        <Container
          className={clsx(
            { [classes.container]: !maxWidth },
            classes.sticky,
            trigger
              ? classes.scroll
              : matches
              ? classes.desktop
              : classes.mobile
          )}
          maxWidth={maxWidth}
        >
          <div className={classes.action}>{action}</div>
        </Container>
      )}
    </>
  );
}
