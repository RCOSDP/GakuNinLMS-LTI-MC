import { MouseEvent } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { makeStyles } from "@material-ui/core/styles";
import Item from "atoms/Item";
import useAccordionStyle from "styles/accordion";
import useAccordionSummaryStyle from "styles/accordionSummary";
import useAccordionDetailStyle from "styles/accordionDetail";

const useStyles = makeStyles((theme) => ({
  chips: {
    padding: theme.spacing(0, 2),
    "& > *": {
      marginRight: theme.spacing(1.75),
      marginBottom: theme.spacing(1),
    },
  },
  items: {
    padding: theme.spacing(0, 2),
    "& > *": {
      display: "inline-block",
      marginRight: theme.spacing(1.75),
      marginBottom: theme.spacing(1),
    },
  },
}));

export default function BookAccordion() {
  const classes = useStyles();
  const accordionClasses = useAccordionStyle();
  const accordionSummaryClasses = useAccordionSummaryStyle();
  const accordionDetailClasses = useAccordionDetailStyle();
  const handleInfoClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
  };
  const handleEditClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
  };
  const handleChipClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };
  return (
    <Accordion classes={accordionClasses}>
      <AccordionSummary
        classes={accordionSummaryClasses}
        IconButtonProps={{ edge: "start" }}
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography variant="h6">コンピュータ・サイエンス</Typography>
        <IconButton onClick={handleInfoClick}>
          <InfoOutlinedIcon />
        </IconButton>
        <IconButton color="primary" onClick={handleEditClick}>
          <EditOutlinedIcon />
        </IconButton>
      </AccordionSummary>
      <AccordionDetails classes={accordionDetailClasses}>
        <div className={classes.chips}>
          <Chip
            label="2020年度 ○○コース"
            variant="outlined"
            color="primary"
            onClick={handleChipClick}
          />
        </div>
        <div className={classes.items}>
          <Item itemKey="作成日" value="2020.11.19" />
          <Item itemKey="更新日" value="2020.11.19" />
          <Item itemKey="著者" value="山田太郎" />
        </div>
        <Divider />
        <List disablePadding>
          <ListItem>
            <ListItemText>
              情報のデジタルコンテンツ化
              <IconButton color="primary" onClick={handleEditClick}>
                <EditOutlinedIcon />
              </IconButton>
            </ListItemText>
          </ListItem>
          <List disablePadding>
            {[...Array(2)].map(({}, key) => (
              <ListItem key={key}>
                <ListItemText>
                  リンゴに夢中のレッサーパンダ
                  <IconButton color="primary" onClick={handleEditClick}>
                    <EditOutlinedIcon />
                  </IconButton>
                </ListItemText>
              </ListItem>
            ))}
          </List>
          <ListItem>
            <ListItemText>
              デジタルとアナログの相違点
              <IconButton color="primary" onClick={handleEditClick}>
                <EditOutlinedIcon />
              </IconButton>
            </ListItemText>
          </ListItem>
        </List>
      </AccordionDetails>
    </Accordion>
  );
}
