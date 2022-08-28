import { IconProps } from "src/type/props";

function Map({ size, stroke }: IconProps) {
  return (
    <svg
      width={size}
      height="100%"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.026 11.8821C16.0157 10.5247 16.4843 8.83725 16.3419 7.14439C16.1994 5.45153 15.4559 3.8729 14.2544 2.71226C13.1209 1.55694 11.5925 0.90918 10.0001 0.90918C8.40771 0.90918 6.87936 1.55694 5.74586 2.71226C4.54672 3.87466 3.80544 5.45357 3.66428 7.14596C3.52313 8.83835 3.99205 10.525 4.98104 11.8821L10.0001 19.091L15.026 11.8821Z"
        stroke={stroke}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.90457 9.98468C11.2924 9.98468 12.4175 8.82247 12.4175 7.38882C12.4175 5.95517 11.2924 4.79297 9.90457 4.79297C8.51669 4.79297 7.3916 5.95517 7.3916 7.38882C7.3916 8.82247 8.51669 9.98468 9.90457 9.98468Z"
        stroke={stroke}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export { Map };
