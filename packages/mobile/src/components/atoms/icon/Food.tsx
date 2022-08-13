import type { IconProps } from "src/type/props";

function Food({ size, stroke }: IconProps) {
  return (
    <svg
      width={size}
      height="100%"
      viewBox="0 0 13 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.54785 6.18091V13"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.54758 6.1429C10.648 6.1429 11.54 4.99162 11.54 3.57145C11.54 2.15128 10.648 1 9.54758 1C8.44721 1 7.55518 2.15128 7.55518 3.57145C7.55518 4.99162 8.44721 6.1429 9.54758 6.1429Z"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.08594 1.57129V12.9999"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.91344 1.59521V3.84287C4.91344 5.14765 4.09418 6.22386 3.08585 6.22386C2.07753 6.22386 1.25342 5.14765 1.25342 3.84287V1.59521"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export { Food };
