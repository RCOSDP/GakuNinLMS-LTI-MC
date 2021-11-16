import makeStyles from "@mui/styles/makeStyles";

export type StickyProps = {
  backgroundColor?: string;
  offset?: string;
  zIndex?: number;
};

const sticky = makeStyles((theme) => ({
  sticky: ({
    backgroundColor = "transparent",
    offset = "0",
    zIndex = 1,
  }: StickyProps) => ({
    zIndex,
    position: "sticky",
    top: offset,
    backgroundColor,
    transition: theme.transitions.create("top", {
      duration: theme.transitions.duration.enteringScreen,
      easing: theme.transitions.easing.easeOut,
    }),
  }),
  scroll: {
    transition: theme.transitions.create("top", {
      duration: theme.transitions.duration.leavingScreen,
      easing: theme.transitions.easing.sharp,
    }),
  },
}));

export default sticky;
