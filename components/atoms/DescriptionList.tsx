import clsx from "clsx";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import type { Theme } from "@material-ui/core/styles";
import grey from "@material-ui/core/colors/grey";

type StyleProps = {
  color: string;
  fontSize: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      color: ({ color }: StyleProps) => color,
      fontSize: ({ fontSize }: StyleProps) => fontSize,
      lineHeight: 1.25,
      "& > $item:not(:last-child)": {
        marginBottom: theme.spacing(0.5),
      },
      "&$inline > $item, &$nowrap > $item": {
        display: "inline-flex",
      },
      "&$inline > $item:not(:last-child), &$nowrap > $item:not(:last-child)": {
        marginRight: theme.spacing(1.25),
      },
      "&$nowrap": {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      },
    },
    item: {
      display: "flex",
      "& > dt::after": {
        content: "':'",
        marginRight: theme.spacing(0.25),
      },
      "& > dd": {
        margin: 0,
      },
    },
    inline: {},
    nowrap: {},
  })
);

type Props = {
  className?: string;
  color?: string;
  fontSize?: string;
  inline?: boolean;
  nowrap?: boolean;
  value: Array<{ key: string; value: string }>;
};

export default function DescriptionList({
  className,
  color = grey[700],
  fontSize = "0.75rem",
  inline = false,
  nowrap = false,
  value,
}: Props) {
  const classes = useStyles({ color, fontSize });

  return (
    <dl
      className={clsx(
        className,
        classes.root,
        { [classes.inline]: inline },
        { [classes.nowrap]: nowrap }
      )}
    >
      {value.map(({ key, value }, index) => (
        <div key={index} className={classes.item}>
          <dt>{key}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}
