import { IconProps } from "src/type/props";

function Theme({ size, stroke }: IconProps) {
  return (
    <svg
      width={size}
      height="100%"
      viewBox="0 0 13 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.19971 13L5.19971 10.8572"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.19971 3.14286L5.19971 1"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.6283 7L9.91406 7"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.70222 11.5025L8.4165 10.2168"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.48997 3.92654L9.70215 2.71436"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="5.19964"
        cy="6.99993"
        r="4.21428"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.19971 2.5V11.5"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.04492 4L5.01514 5.57617"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.85791 5.39648L4.97599 8.11367"
        stroke={stroke}
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        d="M1.41992 7.79248L5.36036 11.3389"
        stroke={stroke}
        strokeLinecap="square"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export { Theme };
