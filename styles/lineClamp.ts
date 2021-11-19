import { css } from "@emotion/css";

type Props = {
  fontSize: string;
  lineClamp: number;
  lineHeight: number;
};

const lineClamp = ({ fontSize, lineClamp, lineHeight }: Props) => ({
  placeholder: css({
    height: `calc(${fontSize} * ${lineClamp} * ${lineHeight})`,
  }),
  clamp: css({
    fontSize,
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: lineClamp,
    lineHeight,
    maxHeight: `calc(${fontSize} * ${lineClamp} * ${lineHeight})`,
    overflow: "hidden",
  }),
});

export default lineClamp;
