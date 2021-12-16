import { useCallback } from "react";
import Typography from "@mui/material/Typography";
import makeStyles from "@mui/styles/makeStyles";
import ZoomImportEnabledSwitch from "$organisms/ZoomImportEnabledSwitch";
import Container from "$atoms/Container";
import { useSessionAtom } from "$store/session";
import type { UserSettingsProps } from "$server/models/userSettings";
import { updateUserSettings } from "$utils/userSettings";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(1),
    "& > :not($title):not($form)": {
      marginBottom: theme.spacing(2),
    },
  },
  title: {
    marginBottom: theme.spacing(4),
  },
  form: {
    marginBottom: theme.spacing(4),
  },
  subtitle: {
    "& span": {
      verticalAlign: "middle",
    },
    "& .RequiredDot": {
      marginRight: theme.spacing(0.5),
      marginBottom: theme.spacing(0.75),
      marginLeft: theme.spacing(2),
    },
  },
  icon: {
    marginRight: theme.spacing(0.5),
  },
  books: {
    marginTop: theme.spacing(1),
    "& > *": {
      marginBottom: theme.spacing(2),
    },
  },
}));

export default function UserSettingsContainer() {
  const classes = useStyles();
  const { session } = useSessionAtom();
  const userSettings = session?.user.settings as UserSettingsProps;
  const onChange = useCallback(async (userSettings: UserSettingsProps) => {
    await updateUserSettings(userSettings);
  }, []);

  return (
    <Container className={classes.container} maxWidth="md">
      <Typography className={classes.title} variant="h4">
        設定
      </Typography>
      {session?.systemSettings?.zoomImportEnabled && (
        <ZoomImportEnabledSwitch
          className={classes.form}
          userSettings={userSettings}
          onChange={onChange}
        />
      )}
    </Container>
  );
}
