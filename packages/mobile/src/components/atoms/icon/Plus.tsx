import type { StyleProps } from "src/type/props";

type Props = {
  width?: string;
  height?: string;
} & StyleProps;

function Plus({ className, style, width, height }: Props) {
  return (
    <svg
      className={className}
      style={style}
      width={width}
      height={height}
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

export { Plus };
