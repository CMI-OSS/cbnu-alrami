import type { StyleProps } from "src/type/props";

function Line({ className, style }: StyleProps) {
  return (
    <svg
      {...{ className, style }}
      width="288"
      height="2"
      viewBox="0 0 288 2"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1L287 1.00003"
        stroke="#B4B4B4"
        strokeWidth="0.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export { Line };
