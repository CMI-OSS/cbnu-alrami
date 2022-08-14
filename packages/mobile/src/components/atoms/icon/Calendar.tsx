import { IconProps } from "src/type/props";

function Calendar({ size, stroke }: IconProps) {
  return (
    <svg
      width={size}
      height="100%"
      viewBox="0 0 16 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.7194 2.45801H0.824707V13H14.7194V2.45801Z"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.93555 1V3.84903"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.77197 1V3.84903"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.6089 1V3.84903"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export { Calendar };
