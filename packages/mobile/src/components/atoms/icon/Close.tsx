import { IconProps } from "src/type/props";

function Close({ size, stroke }: IconProps) {
  return (
    <svg
      width={size}
      height="100%"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.00342 21L20.4835 1"
        stroke={stroke}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M21.0034 21L1.52332 1"
        stroke={stroke}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export { Close };
