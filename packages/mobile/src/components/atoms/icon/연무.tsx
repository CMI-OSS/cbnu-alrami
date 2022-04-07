import type { StyleProps } from "src/type/props";

function 연무({ className, style }: StyleProps) {
  return (
    <svg
      {...{ className, style }}
      width="101"
      height="40"
      viewBox="0 0 101 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        y="21.8789"
        width="61"
        height="9.45455"
        rx="4.72727"
        fill="#D6D6D6"
      />
      <rect
        x="16"
        y="31.3333"
        width="57"
        height="8.66667"
        rx="4.33333"
        fill="#D6D6D6"
      />
      <rect
        x="11"
        y="14"
        width="33"
        height="8.66667"
        rx="4.33333"
        fill="#D6D6D6"
      />
      <rect x="52" y="7" width="41" height="7" rx="3.5" fill="#D6D6D6" />
      <rect x="63" y="14" width="38" height="7" rx="3.5" fill="#D6D6D6" />
      <rect x="68" width="31" height="7" rx="3.5" fill="#D6D6D6" />
    </svg>
  );
}
export { 연무 };
