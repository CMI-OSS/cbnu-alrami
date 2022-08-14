import { IconProps } from "src/type/props";

function Airplane({ size, stroke }: IconProps) {
  return (
    <svg
      width={size}
      height="100%"
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.56223 12.1696L9.88288 17.7316L13.9268 4.80499L6.56223 12.1696Z"
        stroke={stroke}
        strokeLinejoin="round"
      />
      <path
        d="M6.56212 12.1695L1.00007 8.84881L13.9267 4.80488L6.56212 12.1695Z"
        stroke={stroke}
        strokeLinejoin="round"
      />
    </svg>
  );
}

export { Airplane };
