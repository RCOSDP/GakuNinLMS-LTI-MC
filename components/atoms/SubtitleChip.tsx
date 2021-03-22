import Chip from "@material-ui/core/Chip";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import { VideoTrackSchema } from "$server/models/videoTrack";
import languages from "$utils/languages";
import { gray } from "$theme/colors";

const useChipStyles = makeStyles({
  root: {
    backgroundColor: gray[100],
    borderRadius: 4,
  },
});

type Props = {
  videoTrack: VideoTrackSchema;
  onDelete(videoTrack: VideoTrackSchema): void;
};

export default function SubtitleChip(props: Props) {
  const chipClasses = useChipStyles();
  const { videoTrack, onDelete } = props;
  const handleDelete = () => {
    onDelete(videoTrack);
  };
  return (
    <Chip
      classes={chipClasses}
      size="small"
      label={languages[videoTrack.language]}
      onDelete={handleDelete}
      deleteIcon={<CloseIcon />}
    />
  );
}
