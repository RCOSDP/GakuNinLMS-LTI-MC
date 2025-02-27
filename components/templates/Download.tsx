import { useCallback } from "react";
import { Box, Card, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import GetAppOutlinedIcon from "@mui/icons-material/GetAppOutlined";
import makeStyles from "@mui/styles/makeStyles";
import Container from "$atoms/Container";
import useCardStyles from "$styles/card";
import type { BookActivitySchema } from "$server/models/bookActivity";
import type { SessionSchema } from "$server/models/session";
import { gray } from "$theme/colors";
import downloadBookActivity from "$utils/bookLearningActivity/download";

const useStyles = makeStyles(() => ({
  card: {
    border: `1px solid ${gray[300]}`,
    borderRadius: 12,
    boxShadow: "none",
  },
  body: {
    backgroundColor: "#FFF",
  },
}));

type Props = {
  session: SessionSchema;
  bookActivities: Array<BookActivitySchema>;
};

export default function Download(props: Props) {
  const { session, bookActivities } = props;
  const classes = useStyles();
  const cardClasses = useCardStyles();
  const handleBookActivityDownloadClick = useCallback(() => {
    void downloadBookActivity(bookActivities, "視聴分析データ.csv", session);
  }, [bookActivities, session]);

  return (
    <Container maxWidth="md">
      <Typography sx={{ mt: 5 }} variant="h4">
        ダウンロード
      </Typography>
      <Card classes={cardClasses} className={classes.card}>
        <Box className={classes.body}>
          <Button
            onClick={handleBookActivityDownloadClick}
            color="secondary"
            variant="contained"
            size="small"
            disabled={bookActivities.length === 0}
            title="事前に[受講者の同期]ボタンを押してからダウンロードしてください"
          >
            <GetAppOutlinedIcon fontSize="small" />
            視聴分析データをダウンロード
          </Button>
        </Box>
      </Card>
    </Container>
  );
}
