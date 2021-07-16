export default { title: "organisms/TopicPreview" };

import { makeStyles } from "@material-ui/core/styles";
import TopicPreview from "./TopicPreview";
import { topic } from "samples";

const useStyles = makeStyles((theme) => ({
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, 290px)",
    gap: `${theme.spacing(2)}px`,
  },
}));

const defaultProps = {
  topic,
  onTopicPreviewClick: console.log,
  onTopicEditClick: console.log,
};

export const Default = () => {
  const classes = useStyles();
  return (
    <div className={classes.grid}>
      {[...Array(10)].map((_value, index) => (
        <TopicPreview key={index} {...defaultProps} />
      ))}
    </div>
  );
};

export const Checkable = () => {
  const classes = useStyles();
  return (
    <div className={classes.grid}>
      {[...Array(10)].map((_value, index) => (
        <TopicPreview key={index} {...defaultProps} onChange={console.log} />
      ))}
    </div>
  );
};

export const Others = () => {
  const classes = useStyles();
  return (
    <div className={classes.grid}>
      {[...Array(10)].map((_value, index) => (
        <TopicPreview
          key={index}
          {...defaultProps}
          onTopicEditClick={undefined}
        />
      ))}
    </div>
  );
};
