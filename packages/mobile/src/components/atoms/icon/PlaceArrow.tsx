import type { StyleProps } from "src/type/props";

function PlaceArrow({ className, style }: StyleProps) {
  return (
    <svg
      className={className}
      width="33"
      height="43"
      viewBox="0 0 33 43"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M32.5651 40.1345C32.6279 41.923 30.4218 42.8175 29.1203 41.5312L1.42262 14.1596C0.40646 13.1554 0.724848 11.489 2.0343 10.958L28.3954 0.270045C29.7049 -0.260869 31.1796 0.678566 31.2286 2.07488L32.5651 40.1345Z"
        fill="white"
      />
    </svg>
  );
}

export { PlaceArrow };
