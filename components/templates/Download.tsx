import { useMemo, useCallback } from "react";
import { Box, Card, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import GetAppOutlinedIcon from "@mui/icons-material/GetAppOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import makeStyles from "@mui/styles/makeStyles";
import Container from "$atoms/Container";
import ActionHeader from "$organisms/ActionHeader";
import type { ActivityScope } from "$types/activityScope";
import ActivityScopeSelect from "$molecules/ActivityScopeSelect";
import useCardStyles from "$styles/card";
import type { BookActivitySchema } from "$server/models/bookActivity";
import type { SessionSchema } from "$server/models/session";
import { gray } from "$theme/colors";
import downloadBookActivity from "$utils/bookLearningActivity/download";
import useDialogProps from "$utils/useDialogProps";
import useMemberships from "$utils/useMemberships";
import MembersDialog from "$organisms/MembersDialog";
import useLtiMembersHandler from "$utils/useLtiMembersHandler";
import type { LtiNrpsContextMemberSchema } from "$server/models/ltiNrpsContextMember";

const useStyles = makeStyles(() => ({
  card: {
    border: `1px solid ${gray[300]}`,
    borderRadius: 12,
    boxShadow: "none",
  },
  body: {
    backgroundColor: "#FFF",
  },
}));

type Props = {
  session: SessionSchema;
  bookActivities: Array<BookActivitySchema>;
  scope: ActivityScope;
  onScopeChange(activityScope: ActivityScope): void;
};

export default function Download(props: Props) {
  const { session, bookActivities, scope } = props;
  const { data: memberships } = useMemberships();
  const newLtiMembers = useMemo(() => {
    if (!memberships) {
      return [];
    }
    const { members, currentLtiMembers } = memberships;
    return members.filter((member) => {
      return currentLtiMembers?.every(
        (learner) => learner.userId !== member.user_id
      );
    });
  }, [memberships]);
  const updateLtiMembers = useLtiMembersHandler();
  const classes = useStyles();
  const cardClasses = useCardStyles();
  const handleBookActivityDownloadClick = useCallback(() => {
    void downloadBookActivity(bookActivities, "視聴分析データ.csv", session);
  }, [bookActivities, session]);
  const {
    data: membersData,
    dispatch: membersDispatch,
    ...membersDialogProps
  } = useDialogProps<{
    members: LtiNrpsContextMemberSchema[];
  }>();

  const handleUpdateLtiMembers = useCallback(
    async (members: LtiNrpsContextMemberSchema[]) => {
      await updateLtiMembers({
        members,
        currentLtiContextOnly: scope === "current-lti-context-only",
      });
      membersDialogProps.onClose();
    },
    [membersDialogProps, scope, updateLtiMembers]
  );
  const handleMembershipClick = useCallback(
    (members: LtiNrpsContextMemberSchema[]) => () =>
      membersDispatch({ members }),
    [membersDispatch]
  );

  return (
    <Container maxWidth="md">
      <Typography sx={{ mt: 5 }} variant="h4">
        ダウンロード
      </Typography>
      <ActionHeader>
        <ActivityScopeSelect
          value={props.scope}
          onActivityScopeChange={props.onScopeChange}
        />
        <Button
          onClick={handleMembershipClick(memberships?.members || [])}
          color="primary"
          variant="contained"
          size="small"
        >
          <GroupOutlinedIcon fontSize="small" />
          受講者の同期
        </Button>
      </ActionHeader>
      <Card classes={cardClasses} className={classes.card}>
        <Box className={classes.body}>
          <Button
            onClick={handleBookActivityDownloadClick}
            color="secondary"
            variant="contained"
            size="small"
            disabled={bookActivities.length === 0}
            title="事前に[受講者の同期]ボタンを押してからダウンロードしてください"
          >
            <GetAppOutlinedIcon fontSize="small" />
            視聴分析データをダウンロード
          </Button>
        </Box>
      </Card>
      {membersData && (
        <MembersDialog
          members={membersData.members}
          newLtiMembers={newLtiMembers}
          handleUpdateLtiMembers={handleUpdateLtiMembers}
          {...membersDialogProps}
        />
      )}
    </Container>
  );
}
