import { IconProps } from "src/type/props";

function Question({ size, stroke }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height="100%"
      viewBox="0 0 16 16"
    >
      <path
        d="M9 1.992a7 7 0 1 0 7 7 7 7 0 0 0-7-7m0 13a6 6 0 1 1 6-6 6 6 0 0 1-6 6"
        transform="translate(-1 -.996)"
        fill={stroke}
      />
      <path
        d="M15.25 21.992a.75.75 0 1 1-.75.75.75.75 0 0 1 .75-.75"
        transform="translate(-7.25 -10.996)"
        fill={stroke}
      />
      <path
        d="M14 7.992h-.75a2.25 2.25 0 0 0-2.25 2.25v.25h1v-.25a1.25 1.25 0 0 1 1.25-1.25H14a1.25 1.25 0 0 1 0 2.5h-1v2.25h1v-1.25a2.25 2.25 0 0 0 0-4.5"
        transform="translate(-5.5 -3.996)"
        fill={stroke}
      />
    </svg>
  );
}

export { Question };
