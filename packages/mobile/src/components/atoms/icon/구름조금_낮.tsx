import type { StyleProps } from "src/type/props";

function 구름조금_낮({ className, style }: StyleProps) {
  return (
    <svg
      {...{ className, style }}
      width="65"
      height="53"
      viewBox="0 0 65 53"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse
        cx="42.7435"
        cy="20.3661"
        rx="21.3718"
        ry="20.3661"
        fill="#F3D97C"
      />
      <g filter="url(#filter0_b_405_333)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M48.4631 52.8765C48.693 52.8955 48.9255 52.9052 49.1605 52.9052C53.5893 52.9052 57.1796 49.4593 57.1796 45.2085C57.1796 42.5339 55.7583 40.178 53.6011 38.7986C54.1104 37.5725 54.3905 36.2349 54.3905 34.8345C54.3905 28.9204 49.3953 24.126 43.2334 24.126C40.7365 24.126 38.431 24.9133 36.572 26.2434C34.2549 22.378 29.9085 19.7754 24.9288 19.7754C18.1661 19.7754 12.5714 24.5754 11.6413 30.8194C11.5962 30.8189 11.551 30.8186 11.5057 30.8186C5.15127 30.8186 0 35.7628 0 41.8618C0 47.9607 5.15117 52.9049 11.5055 52.905V52.9051H48.4631V52.8765Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_b_405_333"
          x="-4"
          y="15.7754"
          width="65.1796"
          height="41.1299"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImage" stdDeviation="2" />
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur_405_333"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_backgroundBlur_405_333"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
export { 구름조금_낮 };
