import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import SvgIcon from "@material-ui/core/SvgIcon";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import type { Theme } from "@material-ui/core/styles";
import { gray } from "$theme/colors";

type IconProps = Pick<Parameters<typeof SvgIcon>[0], "className"> &
  Pick<Props, "variant" | "end">;

function Icon({ variant, end = false, ...other }: IconProps) {
  const d = {
    section: {
      middle: "M16 26C16 20.0582 15 16.3333 8.5 12C2 7.66667 1 1 1 1V26",
      end: "M1 1C1 1 2 7.66667 8.5 12C15 16.3333 16 20.0582 16 26",
    },
    topic: {
      middle: "M16 14.1944C3.87234 14.1944 1 15.0805 1 1V26",
      end: "M1 1C1 15.0805 3.68085 14.1944 15 14.1944",
    },
  } as const;
  return (
    <SvgIcon {...other} viewBox="0 0 19 27">
      <path
        d={d[variant][end ? "end" : "middle"]}
        fill="none"
        stroke={gray[700]}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {variant === "topic" && (
        <circle cx="15.5" cy="14.5" r="3.5" fill={gray[700]} />
      )}
    </SvgIcon>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      marginLeft: ({ depth }: { depth: number }) => theme.spacing(depth * 1.75),
      marginRight: theme.spacing(1),
    },
    outlineNumber: {
      marginRight: theme.spacing(1),
      lineHeight: 1,
    },
    title: {},
  })
);

type Props = Parameters<typeof ListItem>[0] & {
  variant: "section" | "topic";
  depth?: number;
  end?: boolean;
  outlineNumber?: string;
  name: string | null;
  children?: React.Node;
};

export default function BookChildrenItem({
  variant,
  depth = 0,
  end,
  outlineNumber,
  name,
  children,
  ...other
}: Props) {
  const classes = useStyles({ depth });
  return (
    <ListItem {...other}>
      <Icon className={classes.icon} variant={variant} end={end} />
      <span className={classes.outlineNumber}>{outlineNumber}</span>
      <ListItemText>
        <span className={classes.title}>{name}</span>
      </ListItemText>
      {children}
    </ListItem>
  );
}
