import Chip from "@mui/material/Chip";
import CloseIcon from "@mui/icons-material/Close";
import makeStyles from "@mui/styles/makeStyles";
import type { VideoTrackSchema } from "$server/models/videoTrack";
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
