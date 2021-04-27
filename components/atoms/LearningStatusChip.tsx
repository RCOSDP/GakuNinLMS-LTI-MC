import { useMemo } from "react";
import Chip from "@material-ui/core/Chip";
import type { ChipProps } from "@material-ui/core/Chip";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { common } from "@material-ui/core/colors";
import { learningStatus, gray } from "$theme/colors";
import type { LearningStatus } from "$server/models/learningStatus";

type Props<Element extends React.ElementType> = ChipProps<
  Element,
  {
    type: LearningStatus;
  }
>;

const label: Readonly<{ [key in LearningStatus]: string }> = {
  completed: "完了",
  incompleted: "未完了",
  unopened: "未開封",
};

export default function LearningStatusChip<Element extends React.ElementType>(
  props: Props<Element>
) {
  const { type, ...other } = props;
  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          primary: {
            main: learningStatus[type],
            contrastText: type === "incompleted" ? gray[800] : common.white,
          },
        },
      }),
    [type]
  );

  return (
    <ThemeProvider theme={theme}>
      <Chip color="primary" label={label[type]} {...other} />
    </ThemeProvider>
  );
}
