import type { StyleProps } from "src/type/props";

function Calendar({ className, style }: StyleProps) {
  return (
    <svg
      style={style}
      width="25"
      height="22"
      viewBox="0 0 25 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M23.7635 3.43945H0.929443V21.0758H23.7635V3.43945Z"
        stroke="#D6D6D6"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.0415 1V5.76659"
        stroke="#D6D6D6"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.3464 1V5.76659"
        stroke="#D6D6D6"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.6514 1V5.76659"
        stroke="#D6D6D6"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export { Calendar };
