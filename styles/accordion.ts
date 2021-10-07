import makeStyles from "@mui/styles/makeStyles";

const accordion = makeStyles((theme) => ({
  root: {
    transition: theme.transitions.create(["margin", "border-radius"], {
      duration: theme.transitions.duration.shortest,
    }),
  },
  rounded: {
    "&:first-child": {
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
    },
    "&:last-child": {
      borderBottomLeftRadius: 12,
      borderBottomRightRadius: 12,
    },
  },
  expanded: {
    borderRadius: 12,
  },
}));

export default accordion;
