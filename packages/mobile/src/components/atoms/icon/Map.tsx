import { IconProps } from "src/type/props";

function Map({ size, stroke }: IconProps) {
  return (
    <svg
      width={size}
      height="100%"
      viewBox="0 0 16 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.5956 13.0702C14.6842 11.5771 15.1997 9.72087 15.043 7.85873C14.8863 5.99658 14.0684 4.26009 12.7468 2.98338C11.4999 1.71254 9.81873 1 8.06708 1C6.31543 1 4.63424 1.71254 3.38739 2.98338C2.06834 4.26202 1.25293 5.99883 1.09766 7.86046C0.942386 9.72209 1.4582 11.5774 2.54609 13.0702L8.06708 21L13.5956 13.0702Z"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.96183 10.983C9.48849 10.983 10.7261 9.70461 10.7261 8.1276C10.7261 6.55058 9.48849 5.27216 7.96183 5.27216C6.43517 5.27216 5.19757 6.55058 5.19757 8.1276C5.19757 9.70461 6.43517 10.983 7.96183 10.983Z"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export { Map };
