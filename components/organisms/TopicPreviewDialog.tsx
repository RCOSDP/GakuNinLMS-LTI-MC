import { useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import TopicViewerContent from "$organisms/TopicViewerContent";
import type { TopicSchema } from "$server/models/topic";
import useCardStyles from "$styles/card";
import { useVideoAtom } from "$store/video";

type Props = {
  topic: TopicSchema;
  open: boolean;
  onClose: React.MouseEventHandler;
};

export default function TopicPreviewDialog(props: Props) {
  const cardClasses = useCardStyles();
  const { topic, open, onClose } = props;
  const { video } = useVideoAtom();
  useEffect(() => {
    video.clear();
  }, [video]);
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{ classes: cardClasses }}
      fullWidth
    >
      <TopicViewerContent topic={topic} />
    </Dialog>
  );
}
