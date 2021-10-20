import { useCallback } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import makeStyles from "@mui/styles/makeStyles";
import useContainerStyles from "styles/container";
import ZoomImportEnabledSwitch from "$organisms/ZoomImportEnabledSwitch";
import { useSessionAtom } from "$store/session";
import { UserSettingsProp } from "$server/validators/userSettings";
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
  const containerClasses = useContainerStyles();
  const { session } = useSessionAtom();
  const userSettings = session?.user.settings as UserSettingsProp;
  const onChange = useCallback(async (userSettings: UserSettingsProp) => {
    await updateUserSettings(userSettings);
  }, []);

  return (
    <Container
      classes={containerClasses}
      className={classes.container}
      maxWidth="md"
    >
      <Typography className={classes.title} variant="h4">
        設定
      </Typography>
      <ZoomImportEnabledSwitch
        className={classes.form}
        userSettings={userSettings}
        onChange={onChange}
      />
    </Container>
  );
}
