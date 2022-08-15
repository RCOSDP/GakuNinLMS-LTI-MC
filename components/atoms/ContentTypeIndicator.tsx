import Box from "@mui/material/Box";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

const Heading = styled("h6")({
  color: grey[700],
  fontSize: "0.75rem",
  fontWeight: "normal",
});

const value = {
  book: {
    icon: <MenuBookOutlinedIcon sx={{ mr: 0.5 }} />,
    name: "ブック",
  },
  topic: {
    icon: <LibraryBooksOutlinedIcon sx={{ mr: 0.5 }} />,
    name: "トピック",
  },
  course: {
    icon: <LocalLibraryIcon sx={{ mr: 0.5 }} />,
    name: "コース",
  },
} as const;

type Props = {
  type: keyof typeof value;
};

export default function ContentTypeIndicator({ type }: Props) {
  const { icon, name } = value[type];
  return (
    <section>
      <Heading sx={{ m: 0, mt: -1 }}>コンテンツの種類</Heading>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          "& > p": { m: 0, fontSize: "1.25rem", fontWeight: "bold" },
        }}
      >
        {icon}
        <p>{name}</p>
      </Box>
    </section>
  );
}
