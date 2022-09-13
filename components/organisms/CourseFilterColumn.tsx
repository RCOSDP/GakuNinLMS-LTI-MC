import type { SxProps } from "@mui/system";
import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import Typography from "@mui/material/Typography";
import { useLinkSearchAtom } from "$store/linkSearch";

type Props = { sx?: SxProps; clientIds: string[] };

export default function CourseFilterColumn({ sx, clientIds }: Props) {
  const { onLtiClientClick } = useLinkSearchAtom();

  return (
    <Box sx={sx}>
      <Typography sx={{ pt: 4, mb: 4 }} variant="h5">
        絞り込み
      </Typography>
      <FormControl component="fieldset" sx={{ display: "flex", mb: 2 }}>
        <FormLabel component="legend">LMS</FormLabel>
        <RadioGroup
          defaultValue=""
          onChange={(event) => {
            onLtiClientClick(String(event.target.value));
          }}
        >
          <FormControlLabel
            value=""
            control={<Radio color="primary" size="small" />}
            label="すべて"
          />
          {clientIds.map((id) => (
            <FormControlLabel
              key={id}
              value={id}
              control={<Radio color="primary" size="small" />}
              label={<code>{id}</code>}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Box>
  );
}
