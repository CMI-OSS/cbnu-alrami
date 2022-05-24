/* eslint-disable react/require-default-props */
import type { StyleProps } from "src/type/props";

type Props = {
  width?: string;
  height?: string;
} & StyleProps;

function Info({ className, style, width = "10", height = "10" }: Props) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="5" cy="5" r="4.6" stroke="#999999" strokeWidth="0.8" />
      <path
        d="M5 4.30005V7.30005"
        stroke="#999999"
        strokeWidth="0.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="5" cy="2.80005" r="0.5" fill="#999999" />
    </svg>
  );
}

export { Info };
