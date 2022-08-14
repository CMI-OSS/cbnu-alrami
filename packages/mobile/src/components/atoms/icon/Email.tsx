import { IconProps } from "src/type/props";

function Email({ size, stroke }: IconProps) {
  return (
    <svg
      width={size}
      height="100%"
      viewBox="0 0 18 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.753418"
        y="1.21997"
        width="16.1525"
        height="11"
        rx="0.5"
        stroke={stroke}
      />
      <path
        d="M0.643066 1.12012L8.03599 6.85571C8.38999 7.13035 8.88347 7.13601 9.24368 6.86955L17.0159 1.12012"
        stroke={stroke}
      />
    </svg>
  );
}

export { Email };
