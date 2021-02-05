import { ComponentProps } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { gray } from "theme/colors";

const useAppBarStyles = makeStyles({
  root: {
    borderTop: `1px solid ${gray[400]}`,
    boxShadow: "none",
  },
  colorDefault: {
    backgroundColor: "#fff",
  },
  positionFixed: {
    top: "unset",
    bottom: 0,
  },
});

type Props = ComponentProps<typeof AppBar> &
  Pick<ComponentProps<typeof Container>, "children" | "maxWidth">;

export default function BottomBar(props: Props) {
  const appBarClasses = useAppBarStyles();
  const { children, maxWidth, ...others } = props;
  return (
    <AppBar
      classes={appBarClasses}
      position="fixed"
      color="default"
      {...others}
    >
      <Toolbar>
        <Container maxWidth={maxWidth}>{children}</Container>
      </Toolbar>
    </AppBar>
  );
}
