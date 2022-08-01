import { StyleProps } from "src/type/props";

function Email({ className, style }: StyleProps) {
  return (
    <svg
      {...{ className, style }}
      width="19"
      height="14"
      viewBox="0 0 19 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask id="path-1-inside-1_2530_68" fill="white">
        <rect y="1" width="18.0153" height="12.6036" rx="1" />
      </mask>
      <rect
        y="1"
        width="18.0153"
        height="12.6036"
        rx="1"
        stroke="#5E5E5E"
        strokeWidth="2.2"
        mask="url(#path-1-inside-1_2530_68)"
      />
      <path
        d="M0.409424 1.42012L8.2043 7.46756C8.5583 7.7422 9.05178 7.74786 9.41199 7.4814L17.6058 1.42012"
        stroke="#5E5E5E"
        strokeWidth="1.1"
      />
    </svg>
  );
}
export { Email };
