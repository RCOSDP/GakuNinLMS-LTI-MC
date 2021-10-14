import { useEffect } from "react";
import usePrevious from "@rooks/use-previous";
import clsx from "clsx";
import type { TopicSchema } from "$server/models/topic";
import Card from "@mui/material/Card";
import makeStyles from "@mui/styles/makeStyles";
import TopicViewerContent from "$organisms/TopicViewerContent";
import useCardStyles from "$styles/card";
import { useBookAtom } from "$store/book";
import { useVideoAtom } from "$store/video";

const useStyles = makeStyles({
  root: {
    overflow: "visible",
  },
});

type Props = {
  className?: string;
  topic: TopicSchema;
  onEnded?: () => void;
  offset?: string;
};

export default function TopicViewer({
  className,
  topic,
  onEnded,
  offset,
}: Props) {
  const classes = useStyles();
  const cardClasses = useCardStyles();
  const { book, itemIndex, itemExists } = useBookAtom();
  const { video, updateVideo } = useVideoAtom();
  const prevItemIndex = usePrevious(itemIndex);
  useEffect(() => {
    if (!book) return;
    updateVideo(book.sections);
  }, [book, updateVideo]);
  useEffect(() => {
    if (prevItemIndex?.some((v, i) => v !== itemIndex[i])) {
      video.get(itemExists(prevItemIndex)?.resource.url ?? "")?.player.pause();
    }
    const videoInstance = video.get(itemExists(itemIndex)?.resource.url ?? "");
    if (!videoInstance) return;
    if (videoInstance.type == "vimeo") {
      videoInstance.player.setCurrentTime(0);
      videoInstance.player.play();
    } else {
      videoInstance.player.ready(() => {
        videoInstance.player.currentTime(0);
        videoInstance.player.play();
      });
    }
  }, [video, itemExists, prevItemIndex, itemIndex]);
  return (
    <Card classes={cardClasses} className={clsx(classes.root, className)}>
      <TopicViewerContent topic={topic} onEnded={onEnded} offset={offset} />
    </Card>
  );
}
