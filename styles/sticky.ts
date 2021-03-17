import { makeStyles } from "@material-ui/core/styles";

export type StickyProps = {
  backgroundColor: string;
  top: number;
  zIndex: number;
};

// NOTE: nested selectorとpropsが組み合わせられない
// 例:
// "&$desktop": {
//   "top": (props: Props) => 65 + props.top
// }
// See also https://github.com/mui-org/material-ui/issues/15511
const sticky = makeStyles((theme) => ({
  sticky: (props: StickyProps) => ({
    zIndex: props.zIndex,
    position: "sticky",
    top: props.top,
    backgroundColor: props.backgroundColor,
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
  desktop: (props: StickyProps) => ({
    top: 65 + props.top,
  }),
  mobile: (props: StickyProps) => ({
    top: 55 + props.top,
  }),
}));

export default sticky;
