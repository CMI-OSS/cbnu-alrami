import type { StyleProps } from "src/type/props";

function Call({ className, style }: StyleProps) {
  return (
    <svg
      width="16"
      height="22"
      viewBox="0 0 16 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.6087 12.7327C14.7046 11.2814 15.2235 9.47704 15.0658 7.66696C14.908 5.85688 14.0847 4.16893 12.7542 2.92793C11.499 1.69261 9.80662 1 8.04327 1C6.27991 1 4.58749 1.69261 3.33231 2.92793C2.00445 4.17082 1.18359 5.85906 1.02728 7.66864C0.870973 9.47821 1.39023 11.2816 2.48539 12.7327L8.04327 20.4408L13.6087 12.7327Z"
        stroke="white"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.93741 10.704C9.47426 10.704 10.7201 9.4613 10.7201 7.92837C10.7201 6.39545 9.47426 5.15277 7.93741 5.15277C6.40055 5.15277 5.15468 6.39545 5.15468 7.92837C5.15468 9.4613 6.40055 10.704 7.93741 10.704Z"
        stroke="white"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export { Call };
