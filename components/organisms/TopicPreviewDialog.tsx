import Dialog from "@material-ui/core/Dialog";
import TopicViewerContent from "$molecules/TopicViewerContent";
import { TopicSchema } from "$server/models/topic";
import useCardStyles from "$styles/card";

type Props = {
  topic: TopicSchema;
  open: boolean;
  onClose: React.MouseEventHandler;
};

export default function TopicPreviewDialog(props: Props) {
  const cardClasses = useCardStyles();
  const { topic, open, onClose } = props;
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{ classes: cardClasses }}
      fullWidth
    >
      <TopicViewerContent topic={topic} dialog />
    </Dialog>
  );
}
