import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { makeStyles } from "@material-ui/core/styles";
import DescriptionList from "$atoms/DescriptionList";
import { SessionSchema } from "$server/models/session";
import useCardStyles from "$styles/card";

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: theme.spacing(2),
  },
}));

type Props = {
  session: SessionSchema;
  open: boolean;
  onClose: React.MouseEventHandler;
};

export default function LtiItemDialog(props: Props) {
  const cardClasses = useCardStyles();
  const classes = useStyles();
  const { session, open, onClose } = props;
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{ classes: cardClasses }}
      fullWidth
    >
      <DialogContent>
        <Typography className={classes.title} variant="h5">
          LTI情報
        </Typography>
        <DescriptionList
          value={Object.entries(session.ltiLaunchBody).map(([key, value]) => ({
            key,
            value,
          }))}
        />
      </DialogContent>
    </Dialog>
  );
}
