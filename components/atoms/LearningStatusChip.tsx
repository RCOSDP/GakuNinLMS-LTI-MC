import { useMemo, ComponentProps } from "react";
import Chip from "@material-ui/core/Chip";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { learningStatus, gray } from "$theme/colors";
import type { LearningStatus } from "$server/models/learningStatus";

type Props = ComponentProps<typeof Chip> & {
  type: LearningStatus;
  component?: React.ElementType;
};

const label: Readonly<{ [key in LearningStatus]: string }> = {
  completed: "完了",
  incompleted: "未完了",
  unopened: "未開封",
};

export default function LearningStatusChip(props: Props) {
  const { type, component = "div", ...other } = props;
  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          primary: {
            main: learningStatus[type],
            contrastText: type === "incompleted" ? gray[800] : "#fff",
          },
        },
      }),
    [type]
  );

  return (
    <ThemeProvider theme={theme}>
      <Chip
        color="primary"
        label={label[type]}
        component={component}
        {...other}
      />
    </ThemeProvider>
  );
}
