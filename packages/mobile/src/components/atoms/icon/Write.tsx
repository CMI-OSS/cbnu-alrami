import { IconProps } from "src/type/props";

function Write({ size, stroke }: IconProps) {
  return (
    <svg
      width={size}
      height="100%"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.17336 3.22217H2C1.44772 3.22217 1 3.66988 1 4.22217V12C1 12.5523 1.44772 13 2 13H10.2016C10.7538 13 11.2016 12.5523 11.2016 12V8.11107"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.30707 8.37336L7.69453 8.11911L13 3.03402L10.8778 0.999986L5.57235 6.08507L5.30707 8.37336Z"
        stroke={stroke}
        strokeLinejoin="round"
      />
    </svg>
  );
}

export { Write };
