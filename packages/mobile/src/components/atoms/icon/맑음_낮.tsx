import type { StyleProps } from "src/type/props";

function 맑음_낮({ className, style }: StyleProps) {
  return (
    <svg
      {...{ className, style }}
      width="56"
      height="56"
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="28" cy="28" r="28" fill="#FBE7A1" />
      <circle cx="27.9999" cy="27.9999" r="21.7778" fill="#F3D97C" />
    </svg>
  );
}
export { 맑음_낮 };
