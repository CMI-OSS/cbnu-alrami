import type { StyleProps } from "src/type/props";

type Props = {
  width?: string;
  height?: string;
};

function MoreArrow({
  className,
  style,
  width = "5px",
  height = "12px",
}: Props & StyleProps) {
  return (
    <svg
      {...{ className, width, height, style }}
      viewBox="0 0 5 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.343 0.794202C1.22934 0.60477 0.983634 0.543344 0.794202 0.657003C0.60477 0.770662 0.543344 1.01637 0.657003 1.2058L1.343 0.794202ZM4 6L4.343 6.2058C4.419 6.07913 4.419 5.92087 4.343 5.7942L4 6ZM0.657003 10.7942C0.543344 10.9836 0.60477 11.2293 0.794202 11.343C0.983634 11.4567 1.22934 11.3952 1.343 11.2058L0.657003 10.7942ZM0.657003 1.2058L3.657 6.2058L4.343 5.7942L1.343 0.794202L0.657003 1.2058ZM3.657 5.7942L0.657003 10.7942L1.343 11.2058L4.343 6.2058L3.657 5.7942Z"
        fill="#AAAAAA"
      />
    </svg>
  );
}

export { MoreArrow };
