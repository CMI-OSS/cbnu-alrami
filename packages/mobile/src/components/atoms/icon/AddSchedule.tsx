import type { StyleProps } from "src/type/props";

function AddSchedule({ className, style }: StyleProps) {
  return (
    <svg
      {...{ className, style }}
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 10.6H21"
        stroke="#AAAAAA"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M11.4 21L11.4 0.999999"
        stroke="#AAAAAA"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
export { AddSchedule };
