import type { StyleProps } from "src/type/props";

type Props = {
  width: number;
  height: number;
  color: string;
} & StyleProps;

function Arrow({ width, height, color, style, className }: Props) {
  return (
    <svg
      style={style}
      width={width}
      height={height}
      viewBox="0 0 10 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.06006 1L8.72084 13.5L1.06006 26"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export { Arrow };
