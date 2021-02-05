import { ComponentProps } from "react";
import clsx from "clsx";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import { gray } from "theme/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: 1,
    position: "sticky",
    backgroundColor: gray[50],
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(4),
    "& > *": {
      marginRight: theme.spacing(1),
    },
  },
  action: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: theme.spacing(-2),
    "& > *": {
      marginRight: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  },
  container: {
    padding: 0,
  },
  desktop: {
    top: 65,
  },
  mobile: {
    top: 55,
  },
}));

type Props = Pick<ComponentProps<typeof Container>, "maxWidth"> & {
  title: React.ReactNode | string;
  action: React.ReactNode | string;
};

export default function TopBar(props: Props) {
  const { maxWidth, title, action } = props;
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <div
      className={clsx(classes.root, matches ? classes.desktop : classes.mobile)}
    >
      <Container
        className={clsx({ [classes.container]: !maxWidth })}
        maxWidth={maxWidth}
      >
        <Typography className={classes.title} variant="h4" gutterBottom>
          {title}
        </Typography>
        {action && <div className={classes.action}>{action}</div>}
      </Container>
    </div>
  );
}
