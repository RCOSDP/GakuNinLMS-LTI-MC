import Dialog from "@material-ui/core/Dialog";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TopicViewerContent from "$molecules/TopicViewerContent";
import { TopicSchema } from "$server/models/topic";
import useCardStyles from "$styles/card";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(0),
  },
}));
type Props = {
  topic: TopicSchema;
  open: boolean;
  onClose: React.MouseEventHandler;
};

export default function TopicPreviewDialog(props: Props) {
  const cardClasses = useCardStyles();
  const classes = useStyles();
  const { topic, open, onClose } = props;
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{ classes: cardClasses }}
      fullWidth
    >
      <div className={classes.margin}>
        <TopicViewerContent topic={topic} />
      </div>
    </Dialog>
  );
}
