import type { MouseEvent } from "react";
import { useState } from "react";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import IconButton from "$atoms/IconButton";

type Props = Omit<Parameters<typeof IconButton>[0], "tooltipProps"> & {
  url: string;
};

export default function LinkButton({ url, ...other }: Props) {
  const [anchorEl, setAnchorEl] = useState<
    (EventTarget & HTMLButtonElement) | null
  >(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    const target = event.currentTarget;
    void navigator.clipboard.writeText(url).then(() => {
      setAnchorEl(target);
      setTimeout(() => setAnchorEl(null), 3000);
    });
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        tooltipProps={{ title: "公開URLをコピー" }}
        color="primary"
        size="small"
        onClick={handleClick}
        {...other}
      >
        <LinkOutlinedIcon />
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography sx={{ p: 2 }}>コピーしました</Typography>
      </Popover>
    </div>
  );
}
