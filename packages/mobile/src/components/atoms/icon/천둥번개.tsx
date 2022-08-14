import type { StyleProps } from "src/type/props";

function 천둥번개({ className, style }: StyleProps) {
  return (
    <svg
      {...{ className, style }}
      width="71"
      height="69"
      viewBox="0 0 71 69"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M60.1768 41.1018C60.4622 41.1254 60.751 41.1374 61.0427 41.1374C66.542 41.1374 71 36.8586 71 31.5803C71 28.2593 69.2352 25.334 66.5566 23.6211C67.189 22.0987 67.5368 20.4378 67.5368 18.6989C67.5368 11.3553 61.3343 5.40213 53.6831 5.40213C50.5826 5.40213 47.7199 6.37973 45.4115 8.03131C42.5344 3.23169 37.1375 0 30.9541 0C22.5569 0 15.61 5.96013 14.4551 13.7133C14.399 13.7127 14.3429 13.7124 14.2866 13.7124C6.39635 13.7124 0 19.8516 0 27.4247C0 34.9978 6.39622 41.137 14.2864 41.1371V41.1373H60.1768V41.1018Z"
        fill="#C2C2C2"
      />
      <path
        d="M25.5679 42.8668L37.0731 30.2228C37.83 29.391 39.1715 30.2487 38.734 31.2848L34.7051 40.8264C34.4726 41.377 34.7718 42.0072 35.3454 42.1751L45.7241 45.213C46.4619 45.4289 46.6903 46.362 46.1355 46.8942L32.7418 59.7463C31.8767 60.5764 30.5497 59.4587 31.2207 58.4651L37.1743 49.649C37.5428 49.1033 37.2924 48.3565 36.6694 48.1433L25.9838 44.4859C25.3031 44.2529 25.0837 43.3989 25.5679 42.8668Z"
        fill="#F3D97C"
      />
      <defs>
        <filter
          id="filter0_b_405_366"
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
            result="effect1_backgroundBlur_405_366"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_backgroundBlur_405_366"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
export { 천둥번개 };
