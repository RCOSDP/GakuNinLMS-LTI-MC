import clsx from "clsx";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import TreeView from "@material-ui/lab/TreeView";
import Alert from "@material-ui/lab/Alert";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import AddIcon from "@material-ui/icons/Add";
import GetAppIcon from "@material-ui/icons/GetApp";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import { makeStyles } from "@material-ui/core/styles";
import BookChildrenTree from "$molecules/BookChildrenTree";
import DraggableBookChildren from "$molecules/DraggableBookChildren";
import { SectionSchema } from "$server/models/book/section";
import { TopicSchema } from "$server/models/topic";
import useCardStyles from "$styles/card";
import useSortableSectionsProps from "$utils/useSortableSectionsProps";

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: "visible",
  },
  divider: {
    margin: theme.spacing(0, -3, 2),
  },
  label: {
    display: "flex",
    alignItems: "center",
  },
  items: {
    margin: theme.spacing(0, -1),
    "& > *": {
      marginRight: theme.spacing(1.75),
      marginBottom: theme.spacing(1),
    },
  },
  icon: {
    marginRight: theme.spacing(0.5),
  },
  alert: {
    marginBottom: theme.spacing(2),
  },
  footer: {
    backgroundColor: "#fff",
    position: "sticky",
    bottom: "0px",
    zIndex: 1,
    margin: theme.spacing(2, -3, -2),
    padding: theme.spacing(0, 3, 2),
    borderRadius: "0 0 12px 12px",
    "& > :not(hr)": {
      marginRight: theme.spacing(1.75),
    },
  },
  placeholder: {
    margin: 0,
  },
}));

const useFormControlLabelStyles = makeStyles({
  labelPlacementStart: {
    marginLeft: 0,
  },
});

type Props = {
  sections: SectionSchema[];
  className?: string;
  onBookImportClick?(): void;
  onTopicImportClick?(): void;
  onTopicNewClick?(): void;
  onSectionsUpdate(sections: SectionSchema[]): void;
  onTopicClick(topic: TopicSchema): void;
  onTopicEditClick?(topic: TopicSchema): void;
  isTopicEditable?(topic: TopicSchema): boolean | undefined;
};

export default function BookEditChildren(props: Props) {
  const {
    sections,
    className,
    onTopicClick,
    onTopicEditClick,
    onSectionsUpdate,
    isTopicEditable,
  } = props;
  const cardClasses = useCardStyles();
  const classes = useStyles();
  const formControlLabelClasses = useFormControlLabelStyles();
  const handleItem = (handler?: (topic: TopicSchema) => void) => ([
    sectionIndex,
    topicIndex,
  ]: ItemIndex) => handler?.(sections[sectionIndex].topics[topicIndex]);
  const {
    sortable,
    sortableSections,
    inProgress,
    handleSortableChange,
    handleSectionsUpdate,
    handleSectionsReset,
    handleSectionsSave,
    handleSectionCreate,
  } = useSortableSectionsProps(sections, onSectionsUpdate);
  return (
    <Card classes={cardClasses} className={clsx(className, classes.root)}>
      <div className={classes.items}>
        <Button
          size="small"
          color="primary"
          disabled={sortable}
          onClick={props.onBookImportClick}
        >
          <GetAppIcon className={classes.icon} />
          ブックの再利用
        </Button>
        <Button
          size="small"
          color="primary"
          disabled={sortable}
          onClick={props.onTopicImportClick}
        >
          <GetAppIcon className={classes.icon} />
          トピックの再利用
        </Button>
        <Button
          size="small"
          color="primary"
          disabled={sortable}
          onClick={props.onTopicNewClick}
        >
          <AddIcon className={classes.icon} />
          トピックの作成
        </Button>
        <FormControlLabel
          classes={formControlLabelClasses}
          control={
            <Switch
              size="small"
              color="primary"
              checked={sortable}
              onChange={handleSortableChange}
            />
          }
          label={
            <Typography
              className={classes.label}
              variant="button"
              color="primary"
            >
              <DragIndicatorIcon />
              セクションの編集
            </Typography>
          }
          labelPlacement="start"
        />
      </div>
      <Divider className={classes.divider} />
      {inProgress && (
        <Alert className={classes.alert} severity="info">
          セクションの編集内容が未保存です。反映する場合はセクションの編集中に保存ボタンをクリックしてください
        </Alert>
      )}
      {sortable && (
        <>
          <DraggableBookChildren
            sections={sortableSections}
            onSectionsUpdate={handleSectionsUpdate}
            onSectionCreate={handleSectionCreate}
          />
          <div className={classes.footer}>
            <Divider className={classes.divider} />
            <Button
              color="primary"
              variant="text"
              onClick={handleSectionsReset}
            >
              編集前にリセット
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={handleSectionsSave}
            >
              保存
            </Button>
          </div>
        </>
      )}
      {!sortable && sections.length === 0 && (
        <p className={classes.placeholder}>
          動画は「トピック」という名前の単位で登録されています。
          <br />
          既存のトピックを再利用する、あるいは新たにトピック作成し、ここにトピックを追加してブックを完成してください。
        </p>
      )}
      {!sortable && sections.length > 0 && (
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
        >
          <BookChildrenTree
            sections={sections}
            onItemClick={handleItem(onTopicClick)}
            onItemEditClick={handleItem(onTopicEditClick)}
            isTopicEditable={isTopicEditable}
          />
        </TreeView>
      )}
    </Card>
  );
}
