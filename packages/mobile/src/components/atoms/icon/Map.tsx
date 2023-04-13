import { IconProps } from "src/type/props";

function Map({ size, stroke }: IconProps) {
  return (
    <svg
      width={size}
      height="20"
      viewBox="0 0 14 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.0262 11.882C13.0158 10.5247 13.4845 8.83719 13.342 7.14433C13.1996 5.45147 12.456 3.87283 11.2545 2.71219C10.121 1.55688 8.59267 0.909119 7.00026 0.909119C5.40785 0.909119 3.8795 1.55688 2.74599 2.71219C1.54686 3.8746 0.805575 5.45351 0.664421 7.1459C0.523267 8.83829 0.992188 10.5249 1.98118 11.882L7.00026 19.0909L12.0262 11.882Z"
        stroke={stroke}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.90466 9.98456C8.29253 9.98456 9.41762 8.82235 9.41762 7.3887C9.41762 5.95505 8.29253 4.79285 6.90466 4.79285C5.51679 4.79285 4.39169 5.95505 4.39169 7.3887C4.39169 8.82235 5.51679 9.98456 6.90466 9.98456Z"
        stroke="#AAAAAA"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export { Map };
