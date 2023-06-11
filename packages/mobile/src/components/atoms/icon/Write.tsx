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
        d="M5.17336 2.72217H2C1.44772 2.72217 1 3.16988 1 3.72217V11.5C1 12.0523 1.44772 12.5 2 12.5H10.2016C10.7538 12.5 11.2016 12.0523 11.2016 11.5V7.61107"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.30707 7.87336L7.69453 7.61911L13 2.53402L10.8778 0.499986L5.57235 5.58507L5.30707 7.87336Z"
        stroke={stroke}
        strokeLinejoin="round"
      />
    </svg>
  );
}

export { Write };
