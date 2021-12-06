import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import type { SxProps } from "@mui/system";
import Link from "@mui/material/Link";
import type { ContentSchema } from "$server/models/content";
import licenses from "$utils/licenses";

const Text = styled("span")({
  color: grey[700],
  fontSize: 12,
});

type Props = {
  license: ContentSchema["license"];
  sx?: SxProps;
};

export default function License({ license, sx }: Props) {
  if (!Object.keys(licenses).includes(license))
    return <Text sx={sx}>{license} ライセンス</Text>;
  const { button, url } = licenses[license];
  return (
    <>
      <Link sx={sx} target="_blank" rel="license noreferrer" href={url}>
        <img alt={license} src={button} />
      </Link>
    </>
  );
}
