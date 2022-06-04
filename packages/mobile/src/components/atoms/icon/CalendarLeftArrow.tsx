import { StyleProps } from "src/type/props";

function CalendarLeftArrow({ className, style }: StyleProps) {
  return (
    <svg
      width="9"
      height="18"
      viewBox="0 0 9 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8 17L1 9L8 1" stroke="#AAAAAA" />
    </svg>
  );
}

export { CalendarLeftArrow };
