import type { StyleProps } from "src/type/props";

function PlaceMenu({ className, style }: StyleProps) {
  return (
    <svg
      className={className}
      width="29"
      height="22"
      viewBox="0 0 29 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="7" y="9.5" width="22" height="3" rx="1.5" fill="white" />
      <path
        d="M0 11C0 9.89543 0.895431 9 2 9V9C3.10457 9 4 9.89543 4 11V11C4 12.1046 3.10457 13 2 13V13C0.895431 13 0 12.1046 0 11V11Z"
        fill="white"
      />
      <rect x="7" y="18.5" width="22" height="3" rx="1.5" fill="white" />
      <path
        d="M0 20C0 18.8954 0.895431 18 2 18V18C3.10457 18 4 18.8954 4 20V20C4 21.1046 3.10457 22 2 22V22C0.895431 22 0 21.1046 0 20V20Z"
        fill="white"
      />
      <rect x="7" y="0.5" width="22" height="3" rx="1.5" fill="white" />
      <path
        d="M0 2C0 0.895431 0.895431 0 2 0V0C3.10457 0 4 0.895431 4 2V2C4 3.10457 3.10457 4 2 4V4C0.895431 4 0 3.10457 0 2V2Z"
        fill="white"
      />
    </svg>
  );
}

export { PlaceMenu };
