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
      viewBox="0 0 8 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.00342 17L1.00342 9L7.00342 1"
        stroke={stroke}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export { Arrow };
