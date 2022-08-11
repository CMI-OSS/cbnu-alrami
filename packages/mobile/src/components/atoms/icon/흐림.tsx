import type { StyleProps } from "src/type/props";

function 흐림({ className, style }: StyleProps) {
  return (
    <svg
      {...{ className, style }}
      width="71"
      height="42"
      viewBox="0 0 71 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M60.1768 41.1018C60.4622 41.1254 60.751 41.1374 61.0427 41.1374C66.542 41.1374 71 36.8586 71 31.5803C71 28.2593 69.2352 25.334 66.5566 23.6211C67.189 22.0987 67.5368 20.4378 67.5368 18.6989C67.5368 11.3553 61.3343 5.40213 53.6831 5.40213C50.5826 5.40213 47.7199 6.37973 45.4115 8.03131C42.5344 3.23169 37.1375 0 30.9541 0C22.5569 0 15.61 5.96013 14.4551 13.7133C14.399 13.7127 14.3429 13.7124 14.2866 13.7124C6.39635 13.7124 0 19.8516 0 27.4247C0 34.9978 6.39622 41.137 14.2864 41.1371V41.1373H60.1768V41.1018Z"
        fill="#C2C2C2"
      />
      <defs>
        <filter
          id="filter0_b_405_359"
          x="-4"
          y="-4"
          width="79"
          height="49.1375"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImage" stdDeviation="2" />
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur_405_359"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_backgroundBlur_405_359"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
export { 흐림 };
