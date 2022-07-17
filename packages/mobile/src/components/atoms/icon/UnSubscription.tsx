import type { StyleProps } from "src/type/props";

type Props = {
  color: string;
} & StyleProps;

function UnSubscription({ style, color }: Props) {
  return (
    <svg
      width="22"
      height="15"
      viewBox="0 0 22 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <rect
        x="2.30908"
        y="2.33105"
        width="17.8889"
        height="10.6667"
        rx="1.43548"
        stroke={color}
      />
      <path d="M5.14258 6.27539H17.3648" stroke={color} strokeLinecap="round" />
      <path d="M5.14258 9.05322H17.3648" stroke={color} strokeLinecap="round" />
      <path
        d="M21.2534 0.719971L1.25342 14.0533"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export { UnSubscription };
