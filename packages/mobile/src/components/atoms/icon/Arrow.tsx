import type { StyleProps } from "src/type/props";

function Arrow({ className, style }: StyleProps) {
  return (
    <svg
      {...{ className, style }}
      width="10"
      height="27"
      viewBox="0 0 10 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.06006 1L8.72084 13.5L1.06006 26"
        stroke="#CECECE"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export { Arrow };
