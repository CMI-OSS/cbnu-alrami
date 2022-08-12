import { IconProps } from "src/type/props";

function Share({ size, stroke }: IconProps) {
  return (
    <svg
      width={size}
      height="100%"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.6283 13.7821C5.07798 13.7821 6.25318 12.6378 6.25318 11.2262C6.25318 9.81469 5.07798 8.67041 3.6283 8.67041C2.17862 8.67041 1.00342 9.81469 1.00342 11.2262C1.00342 12.6378 2.17862 13.7821 3.6283 13.7821Z"
        stroke={stroke}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.3783 6.11165C19.828 6.11165 21.0032 4.96737 21.0032 3.55583C21.0032 2.14428 19.828 1 18.3783 1C16.9286 1 15.7534 2.14428 15.7534 3.55583C15.7534 4.96737 16.9286 6.11165 18.3783 6.11165Z"
        stroke={stroke}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.3783 20.9998C19.828 20.9998 21.0032 19.8556 21.0032 18.444C21.0032 17.0325 19.828 15.8882 18.3783 15.8882C16.9286 15.8882 15.7534 17.0325 15.7534 18.444C15.7534 19.8556 16.9286 20.9998 18.3783 20.9998Z"
        stroke={stroke}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.9843 5.06079L6.56396 10.4738"
        stroke={stroke}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.91553 12.4514L15.5212 17.6931"
        stroke={stroke}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export { Share };
