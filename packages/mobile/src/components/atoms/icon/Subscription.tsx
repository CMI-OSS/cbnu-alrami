import { IconProps } from "src/type/props";

function Subscription({ size, stroke, style }: IconProps) {
  return (
    <svg
      width={size}
      height="100%"
      style={style}
      viewBox="0 0 21 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="1.32471"
        y="1.21997"
        width="18.4286"
        height="11"
        rx="1.423"
        stroke={stroke}
      />
      <path d="M4.25293 5.2915H16.8244" stroke={stroke} strokeLinecap="round" />
      <path
        d="M4.25293 8.14844H16.8244"
        stroke={stroke}
        strokeLinecap="round"
      />
    </svg>
  );
}

export { Subscription };
