import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import makeStyles from "@mui/styles/makeStyles";
import {
  Button,
  DialogActions,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import type { LtiNrpsContextMemberSchema } from "$server/models/ltiNrpsContextMember";
import React, { Fragment } from "react";

const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
  },
}));

type Props = {
  members: LtiNrpsContextMemberSchema[];
  newLtiMembers: LtiNrpsContextMemberSchema[];
  open: boolean;
  onClose: React.MouseEventHandler;
  handleUpdateLtiMembers: (
    members: LtiNrpsContextMemberSchema[]
  ) => Promise<void>;
};

// TODO：storybook対応
export default function MembersDialog(props: Props) {
  const { members, newLtiMembers, open, onClose, handleUpdateLtiMembers } =
    props;
  const classes = useStyles();

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <IconButton className={classes.closeButton} onClick={onClose}>
        <CloseIcon />
      </IconButton>
      <DialogTitle>
        <Typography variant="h5" component="p">
          受講者の同期
        </Typography>
        <Typography variant="subtitle1" component="p">
          LMSからコースの受講者に関する情報を取得し、反映します。
        </Typography>
      </DialogTitle>
      <DialogContent>
        {newLtiMembers.length === 0 ? (
          <Typography variant="body1" component="p">
            新規のメンバーは存在しません。既存メンバーの情報更新のみを行います。
          </Typography>
        ) : (
          <List disablePadding={false}>
            {newLtiMembers.map((member) => {
              return (
                <Fragment key={member.user_id}>
                  <ListItem dense={true}>
                    <Grid container>
                      <Grid item xs={5}>
                        <ListItemText>ID: {member.user_id}</ListItemText>
                      </Grid>
                      <Grid item xs={5}>
                        <ListItemText>
                          名前: {member?.name || "未公開"}
                        </ListItemText>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <Divider />
                </Fragment>
              );
            })}
          </List>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={async () => await handleUpdateLtiMembers(members)}
          color="primary"
          size="small"
        >
          同期
        </Button>
      </DialogActions>
    </Dialog>
  );
}
