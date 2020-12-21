import red from "@material-ui/core/colors/red";

export default function RequiredDot() {
  return (
    <svg
      className="RequiredDot"
      width="6px"
      height="6px"
      viewBox="0 0 6 6"
      aria-hidden="true"
    >
      <circle fill={red[600]} cx="3" cy="3" r="2.5" />
    </svg>
  );
}
