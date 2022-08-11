import { IconProps } from "src/type/props";

function Time({ size, stroke }: IconProps) {
  return (
    <svg
      width={size}
      height="100%"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="6.75342" cy="6.55322" r="6" stroke={stroke} />
      <path
        d="M6.75342 7.20308V2.65308"
        stroke={stroke}
        strokeLinecap="round"
      />
      <path
        d="M6.75338 7.23792L9.3534 4.60339"
        stroke={stroke}
        strokeLinecap="round"
      />
    </svg>
  );
}

export { Time };
