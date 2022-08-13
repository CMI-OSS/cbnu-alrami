import { IconProps } from "src/type/props";

function Info({ size, stroke }: IconProps) {
  return (
    <svg
      width={size}
      height="100%"
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.9854 6.17568C11.9854 9.29046 9.51344 11.7981 6.48535 11.7981C3.45726 11.7981 0.985352 9.29046 0.985352 6.17568C0.985352 3.06091 3.45726 0.553223 6.48535 0.553223C9.51344 0.553223 11.9854 3.06091 11.9854 6.17568Z"
        stroke={stroke}
      />
      <path
        d="M6.48535 5.3186V8.99208"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <ellipse cx="6.48574" cy="3.48188" rx="0.6" ry="0.612246" fill={stroke} />
    </svg>
  );
}

export { Info };
