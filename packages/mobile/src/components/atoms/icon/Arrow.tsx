import * as React from "react";

import { IconProps } from "src/type/props";

type Props = {
  style?: React.CSSProperties;
} & IconProps;

function Arrow({ size, stroke, style }: Props) {
  return (
    <svg
      width={size}
      height="100%"
      style={style}
      viewBox="0 0 7 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.25342 13.3633L1.00342 7.36328L6.25342 1.36328"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export { Arrow };
