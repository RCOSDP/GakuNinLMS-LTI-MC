import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import Link from "@mui/material/Link";
import type { ContentSchema } from "$server/models/content";
import licenses from "$utils/licenses";

const Text = styled("p")({
  color: grey[700],
  fontSize: 12,
});

type Props = {
  license: ContentSchema["license"];
};

export default function License({ license }: Props) {
  if (!Object.keys(licenses).includes(license))
    return <Text>この作品は{license} ライセンスの下に提供されています</Text>;
  const { button, url, name } = licenses[license];
  return (
    <>
      <Link
        sx={{ display: "block" }}
        target="_blank"
        rel="license noreferrer"
        href={url}
      >
        <img alt={license} src={button} />
      </Link>
      <Text sx={{ mt: 0 }}>
        この作品は
        <Link target="_blank" rel="license noreferrer" href={url}>
          {name}
        </Link>
        の下に提供されています
      </Text>
    </>
  );
}
