import Tooltip from "@mui/material/Tooltip";
import PeopleIcon from "@mui/icons-material/People";
import { gray } from "$theme/colors";

type Props = {
  className?: string;
};

export default function SharedIndicator(props: Props) {
  const { className } = props;
  return (
    <Tooltip title="教員にシェアしています">
      <PeopleIcon
        className={className}
        fontSize="small"
        htmlColor={gray[700]}
      />
    </Tooltip>
  );
}
