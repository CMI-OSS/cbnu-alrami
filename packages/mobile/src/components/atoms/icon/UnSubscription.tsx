import type { IconProps } from "src/type/props";

function UnSubscription({ size, stroke, style }: IconProps) {
  return (
    <svg
      width={size}
      height="100%"
      style={style}
      viewBox="0 0 22 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="2.30908"
        y="2.33105"
        width="17.8889"
        height="10.6667"
        rx="1.43548"
        stroke={stroke}
      />
      <path
        d="M5.14258 6.27539H17.3648"
        stroke={stroke}
        strokeLinecap="round"
      />
      <path
        d="M5.14258 9.05322H17.3648"
        stroke={stroke}
        strokeLinecap="round"
      />
      <path
        d="M21.2534 0.719971L1.25342 14.0533"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export { UnSubscription };
