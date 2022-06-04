import type { StyleProps } from "src/type/props";

function CalendarRightArrow({ className, style }: StyleProps) {
  return (
    <svg
      width="9"
      height="18"
      viewBox="0 0 9 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1 1L8 9L1 17" stroke="#AAAAAA" />
    </svg>
  );
}

export { CalendarRightArrow };
