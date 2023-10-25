import { css } from "@emotion/css";
import type { TagSchema } from "$server/models/bookmark";

const tagClass = css({
  display: "flex",
  alignItems: "center",
  height: "26px",
  boxSizing: "border-box",
  borderRadius: "999px",
  margin: "6px 8px 6px 0px",
  padding: "4px 16px",
  background: "#FFF",
  border: "solid 1px #F3F4F6",
});

const text = css({
  fontSize: "12px",
});

const circle = css({
  display: "inline-block",
  borderRadius: "50%",
  width: "6px",
  height: "6px",
  marginRight: "8px",
});

type Props = {
  tag: TagSchema;
};

export default function Tag({ tag }: Props) {
  return (
    <div className={tagClass}>
      <span style={{ background: tag.color }} className={circle} />
      <p className={text}>{tag.label}</p>
    </div>
  );
}
