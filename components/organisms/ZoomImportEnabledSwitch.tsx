import { useState } from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { FormGroup, FormControlLabel } from "@mui/material";
import Switch from "@mui/material/Switch";
import makeStyles from "@mui/styles/makeStyles";
import clsx from "clsx";
import useCardStyles from "styles/card";
import gray from "theme/colors/gray";
import { UserSettingsProp } from "$server/validators/userSettings";

const useStyles = makeStyles((theme) => ({
  margin: {
    "& > :not(:first-child)": {
      marginTop: theme.spacing(2.5),
    },
  },
  labelDescription: {
    marginLeft: theme.spacing(0.75),
    color: gray[600],
  },
}));

type Props = {
  className?: string;
  userSettings: UserSettingsProp;
  onChange: (userSettings: UserSettingsProp) => void;
};

export default function ZoomImportEnabledSwitch(props: Props) {
  const { className, userSettings, onChange } = props;
  const cardClasses = useCardStyles();
  const classes = useStyles();
  const [zoomImportEnabled, setZoomImportEnabled] = useState(
    userSettings.zoomImportEnabled
  );

  return (
    <Card classes={cardClasses} className={clsx(classes.margin, className)}>
      <Typography variant="h6">
        Zoomクラウドレコーディングのインポート
      </Typography>
      一定の時間間隔でZoomのビデオレコーディングをWowzaにアップロードし、トピック単位でちびチロにインポートします。
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              size="small"
              defaultChecked={zoomImportEnabled}
              onChange={async (e, bool) => {
                await onChange({ zoomImportEnabled: bool });
                setZoomImportEnabled(bool);
              }}
            />
          }
          label={zoomImportEnabled ? "有効" : "無効"}
        />
      </FormGroup>
    </Card>
  );
}
