import { useMemo } from "react";
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

/** LTI v1.1 起動時リクエストっぽいオブジェクトへの変換 */
function useLtiLaunchBody(session: SessionSchema) {
  return useMemo(
    () => ({
      oauth_nonce: session.oauthClient.nonce,
      oauth_consumer_key: session.oauthClient.id,
      lti_version: session.ltiVersion,
      resource_link_id: session.ltiResourceLinkRequest.id,
      user_id: session.ltiUser.id,
      roles: session.ltiRoles.join(","),
      context_id: session.ltiContext.id,
      resource_link_title: session.ltiResourceLinkRequest.title,
      context_title: session.ltiContext.title,
      context_label: session.ltiContext.label,
      lis_person_name_full: session.ltiUser.name,
      launch_presentation_return_url: session.ltiLaunchPresentation?.returnUrl,
    }),
    [session]
  );
}

export default function LtiItemDialog(props: Props) {
  const cardClasses = useCardStyles();
  const classes = useStyles();
  const { session, open, onClose } = props;
  const ltiLaunchBody = useLtiLaunchBody(session);
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
          value={Object.entries(ltiLaunchBody).flatMap(([key, value]) =>
            value == null ? [] : [{ key, value }]
          )}
        />
      </DialogContent>
    </Dialog>
  );
}
