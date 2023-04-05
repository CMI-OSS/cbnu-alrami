import { IconProps } from "src/type/props";

function LeftArrow({ size, stroke, style }: IconProps) {
  return (
    <svg
      width={size}
      height="100%"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <path
        d="M10.0943 1L1.00342 11L10.0943 21"
        stroke={stroke}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.00342 11H21.0034"
        stroke={stroke}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export { LeftArrow };
