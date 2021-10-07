import makeStyles from "@mui/styles/makeStyles";

type Props = {
  fontSize: string;
  lineClamp: number;
  lineHeight: number;
};

const lineClamp = makeStyles({
  placeholder: {
    height: (props: Props) =>
      `calc(${props.fontSize} * ${props.lineClamp} * ${props.lineHeight})`,
  },
  clamp: {
    fontSize: (props) => props.fontSize,
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: (props: Props) => props.lineClamp,
    lineHeight: (props: Props) => props.lineHeight,
    maxHeight: (props: Props) =>
      `calc(${props.fontSize} * ${props.lineClamp} * ${props.lineHeight})`,
    overflow: "hidden",
  },
});

export default lineClamp;
