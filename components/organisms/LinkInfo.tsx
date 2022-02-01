import type { SxProps } from "@mui/system";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import LinkIcon from "@mui/icons-material/Link";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import DescriptionList from "$atoms/DescriptionList";
import type { BookSchema } from "$server/models/book";
import { useSessionAtom } from "$store/session";
import { common, blue } from "@mui/material/colors";

const Thumb = styled("span")(({ theme }) => ({
  width: 28,
  height: 28,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: blue[500],
  borderRadius: "50%",
  boxShadow: theme.shadows[1],
  "& > svg": {
    fill: common.white,
  },
}));

const Info = styled("div")(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1),
  alignItems: "center",
}));

type Props = {
  sx?: SxProps;
  book?: BookSchema;
  onLinkedBookClick?(book: BookSchema): void;
};

export default function LinkInfo({ sx, book, onLinkedBookClick }: Props) {
  const { session } = useSessionAtom();
  const handleLinkedBookClick = () => book && onLinkedBookClick?.(book);
  return (
    <Info sx={sx}>
      <Thumb>
        <LinkIcon />
      </Thumb>
      <DescriptionList
        color={common.black}
        value={[
          {
            key: "リンク元",
            value:
              session && session.ltiLaunchPresentation ? (
                <Link
                  href={session.ltiLaunchPresentation.returnUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {session.ltiResourceLinkRequest.title}
                </Link>
              ) : (
                "なし"
              ),
          },
        ]}
      />
      <CompareArrowsIcon />
      <DescriptionList
        color={common.black}
        value={[
          {
            key: "ブック",
            value: book ? (
              <Button
                variant="text"
                color="primary"
                size="small"
                onClick={handleLinkedBookClick}
              >
                {book.name}
              </Button>
            ) : (
              "なし"
            ),
          },
        ]}
      />
    </Info>
  );
}
