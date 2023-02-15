import type { TopicSchema } from "$server/models/topic";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { useTheme } from "@mui/material/styles";
import Video from "$organisms/Video";
import DescriptionList from "$atoms/DescriptionList";
import License from "$atoms/License";
import Markdown from "$atoms/Markdown";
import useSticky from "$utils/useSticky";
import getLocaleDateString from "$utils/getLocaleDateString";
import { authors } from "$utils/descriptionList";
import formatInterval from "$utils/formatInterval";
import { isVideoResource } from "$utils/videoResource";
import { gray } from "$theme/colors";
import type { ActivitySchema } from "$server/models/activity";

type Props = {
  topic: TopicSchema;
  bookActivity: ActivitySchema[];
  onEnded?: () => void;
  offset?: string;
};

export default function TopicViewerContent({
  topic,
  bookActivity,
  onEnded,
  offset,
}: Props) {
  const theme = useTheme();
  const sticky = useSticky({
    offset: offset ?? theme.spacing(-2),
    backgroundColor: gray[800],
  });
  console.log(bookActivity);
  return (
    <>
      {isVideoResource(topic.resource) && (
        <Video
          className={sticky}
          sx={{ mt: -2, mx: -3, mb: 2 }}
          topic={topic}
          onEnded={onEnded}
        />
      )}
      <header>
        <Typography
          sx={{
            display: "inline-block",
            verticalAlign: "middle",
            mr: 1,
            mb: 0.5,
          }}
          variant="h6"
        >
          {topic.name}
        </Typography>
        <Chip
          sx={{ mr: 1, mb: 0.5 }}
          label={`学習時間 ${formatInterval(0, topic.timeRequired * 1000)}`}
        />
        {topic.license && (
          <License sx={{ mr: 1, mb: 0.5 }} license={topic.license} />
        )}
      </header>
      <DescriptionList
        inline
        value={[
          {
            key: "作成日",
            value: getLocaleDateString(topic.createdAt, "ja"),
          },
          {
            key: "更新日",
            value: getLocaleDateString(topic.updatedAt, "ja"),
          },
          ...authors(topic),
        ]}
      />
      <article>
        <Markdown>{topic.description}</Markdown>
      </article>
    </>
  );
}
