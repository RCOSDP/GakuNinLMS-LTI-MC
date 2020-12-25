import { TopicSchema } from "$server/models/topic";
import Card from "@material-ui/core/Card";
import TopicViewerContent from "$molecules/TopicViewerContent";
import useCardStyles from "styles/card";

type Props = {
  topic: TopicSchema;
  onEnded?: () => void;
};

export default function TopicPlaer(props: Props) {
  const cardClasses = useCardStyles();
  const { topic, onEnded } = props;
  return (
    <Card classes={cardClasses}>
      <TopicViewerContent topic={topic} onEnded={onEnded} />
    </Card>
  );
}
