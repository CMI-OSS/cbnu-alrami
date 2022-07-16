import type { StyleProps } from "src/type/props";

function CallSubmit({ className, style }: StyleProps) {
  return (
    <svg
      width="62"
      height="62"
      viewBox="0 0 62 62"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="31" cy="31" r="31" fill="#D66D6E" />
      <path
        d="M25.77 36.3507L34.588 51.1207L45.3267 16.794L25.77 36.3507Z"
        stroke="white"
        strokeWidth="2.1"
        strokeLinejoin="round"
      />
      <path
        d="M25.77 36.3507L11 27.5327L45.3267 16.794L25.77 36.3507Z"
        stroke="white"
        strokeWidth="2.1"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export { CallSubmit };
