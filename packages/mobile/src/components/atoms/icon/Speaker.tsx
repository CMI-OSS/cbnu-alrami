import type { StyleProps } from "src/type/props";

type Props = {
  width?: string;
  height?: string;
  color?: string;
} & StyleProps;

function Speaker({ width, height, color, className, style }: Props) {
  return (
    <svg
      {...{ className, style }}
      width={width || "24"}
      height="22"
      viewBox="0 0 24 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.27862 5.64578H1.46484V13.538H7.64258L22.7278 19.2464V1.16333L7.27862 5.64578Z"
        stroke={color || "#D6D6D6"}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.55469 14.7063V20.7021H9.64445V15.4342"
        stroke={color || "#D6D6D6"}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export { Speaker };
