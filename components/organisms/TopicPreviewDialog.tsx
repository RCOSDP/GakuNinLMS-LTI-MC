import Dialog from "@mui/material/Dialog";
import TopicViewerContent from "$organisms/TopicViewerContent";
import type { TopicSchema } from "$server/models/topic";
import useCardStyles from "$styles/card";
import type { OembedSchema } from "$server/models/oembed";

type Props = {
  topic: TopicSchema;
  open: boolean;
  onClose: React.MouseEventHandler;
  thumbnailUrl?: OembedSchema["thumbnail_url"];
};

export default function TopicPreviewDialog(props: Props) {
  const cardClasses = useCardStyles();
  const { topic, open, onClose, thumbnailUrl } = props;
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{ classes: cardClasses }}
      fullWidth
    >
      <TopicViewerContent topic={topic} thumbnailUrl={thumbnailUrl} />
    </Dialog>
  );
}
