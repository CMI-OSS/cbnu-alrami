import type { StyleProps } from "src/type/props";

function Time({ className, style }: StyleProps) {
  return (
    <svg
      width="19"
      height="18"
      viewBox="0 0 19 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="9.59831" cy="8.96364" r="8.46364" stroke="#AAAAAA" />
      <path
        d="M9.59782 9.85984V3.5853"
        stroke="#AAAAAA"
        strokeLinecap="round"
      />
      <path
        d="M9.59863 9.90796L13.1841 6.2749"
        stroke="#AAAAAA"
        strokeLinecap="round"
      />
    </svg>
  );
}

export { Time };
