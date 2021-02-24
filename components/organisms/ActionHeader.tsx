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
    paddingBottom: theme.spacing(2),
  },
  title: {
    marginBottom: 0,
    "& > *": {
      marginRight: theme.spacing(1),
    },
  },
  action: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    paddingTop: theme.spacing(2),
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
    top: 0,
    transition: theme.transitions.create("top", {
      duration: theme.transitions.duration.leavingScreen,
      easing: theme.transitions.easing.sharp,
    }),
  },
  desktop: {
    top: 65,
  },
  mobile: {
    top: 55,
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
          <Typography className={classes.title} variant="h4" gutterBottom>
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
