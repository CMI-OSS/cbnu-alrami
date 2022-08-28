import type { IconProps } from "src/type/props";

function Food({ size, stroke }: IconProps) {
  return (
    <svg
      width={size}
      height="100%"
      viewBox="0 0 21 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.3643 9.63501V21.0001"
        stroke={stroke}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.3636 9.57149C17.2356 9.57149 18.7531 7.6527 18.7531 5.28575C18.7531 2.91879 17.2356 1 15.3636 1C13.4916 1 11.9741 2.91879 11.9741 5.28575C11.9741 7.6527 13.4916 9.57149 15.3636 9.57149Z"
        stroke={stroke}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.37109 1.95215V20.9998"
        stroke={stroke}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.47986 1.99219V5.73828C7.47986 7.91292 6.08612 9.7066 4.37076 9.7066C2.6554 9.7066 1.25342 7.91292 1.25342 5.73828V1.99219"
        stroke={stroke}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export { Food };
