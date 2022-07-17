import type { StyleProps } from "src/type/props";

type Props = {
  width?: string;
  height?: string;
} & StyleProps;

function Write({ className, style, width = "14", height = "15" }: Props) {
  return (
    <svg
      {...{ className, style, width, height }}
      viewBox="0 0 14 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 3.5H1.5C0.947715 3.5 0.5 3.94772 0.5 4.5V13.5C0.5 14.0523 0.947715 14.5 1.5 14.5H10.5C11.0523 14.5 11.5 14.0523 11.5 13.5V9"
        stroke="#AAAAAA"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.14395 9.29507L7.71826 9.00903L13.439 3.28833L11.1507 1.00005L5.42998 6.72075L5.14395 9.29507Z"
        stroke="#AAAAAA"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export { Write };
