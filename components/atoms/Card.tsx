import MuiCard, { type CardProps, type CardTypeMap } from "@mui/material/Card";
import { defu } from "defu";
import useCardStyles from "$styles/card";

function Card<
  D extends React.ElementType = CardTypeMap["defaultComponent"],
  P = object
>(props: CardProps<D, P>) {
  const classes = useCardStyles();
  return (
    <MuiCard
      {...props}
      classes={defu(classes, props.classes)}
      sx={defu(
        {
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          rowGap: 2.5,
        } as const,
        props.sx
      )}
    />
  );
}

export default Card;
