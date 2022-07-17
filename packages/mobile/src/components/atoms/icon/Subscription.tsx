import type { StyleProps } from "src/type/props";

type Props = {
  color: string;
} & StyleProps;

function Subscription({ style, color }: Props) {
  return (
    <svg
      width="21"
      height="13"
      viewBox="0 0 21 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <rect
        x="1.32471"
        y="1.21997"
        width="18.4286"
        height="11"
        rx="1.423"
        stroke={color}
      />
      <path d="M4.25293 5.2915H16.8244" stroke={color} strokeLinecap="round" />
      <path d="M4.25293 8.14844H16.8244" stroke={color} strokeLinecap="round" />
    </svg>
  );
}

export { Subscription };
