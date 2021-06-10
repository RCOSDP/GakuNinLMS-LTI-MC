import { ComponentProps } from "react";
import clsx from "clsx";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import { gray } from "$theme/colors";
import useSticky from "$utils/useSticky";
import useAppBarOffset from "$utils/useAppBarOffset";

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
  action: React.ReactNode;
};

export default function ActionHeader(props: Props) {
  const { maxWidth, title, action } = props;
  const classes = useStyles();
  const theme = useTheme();
  const appBarOffset = useAppBarOffset();
  const sticky = useSticky({
    backgroundColor: gray[50],
    offset: appBarOffset + theme.spacing(-2),
    zIndex: 2,
  });
  return (
    <>
      {title && (
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
      )}
      {action && (
        <Container
          className={clsx({ [classes.container]: !maxWidth }, sticky)}
          maxWidth={maxWidth}
        >
          <div className={classes.action}>{action}</div>
        </Container>
      )}
    </>
  );
}
