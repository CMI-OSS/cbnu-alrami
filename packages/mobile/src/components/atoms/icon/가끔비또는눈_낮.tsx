import type { StyleProps } from "src/type/props";

function 가끔비또는눈_낮({ className, style }: StyleProps) {
  return (
    <svg
      className={className}
      style={style}
      width="49"
      height="30"
      viewBox="0 0 49 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_b_901_1022)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M41.3603 29.0264C41.5564 29.0426 41.7548 29.0508 41.9552 29.0508C45.735 29.0508 48.799 26.1099 48.799 22.4822C48.799 20.1996 47.586 18.189 45.745 17.0117C46.1797 15.9654 46.4187 14.8238 46.4187 13.6287C46.4187 8.58131 42.1556 4.48963 36.8969 4.48963C34.7659 4.48963 32.7985 5.1615 31.2119 6.29659C29.2345 2.99782 25.5251 0.776688 21.2753 0.776688C15.5039 0.776688 10.7293 4.873 9.93534 10.2017C9.89672 10.2013 9.85806 10.2011 9.81934 10.2011C4.39627 10.2011 0 14.4206 0 19.6257C0 24.8308 4.39627 29.0503 9.81934 29.0503C9.81936 29.0503 9.81937 29.0503 9.81938 29.0503V29.0509H41.3603V29.0264Z"
          fill="#C3C3C3"
        />
      </g>
      <defs>
        <filter
          id="filter0_b_901_1022"
          x="-4"
          y="-3.22331"
          width="56.799"
          height="36.2742"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImage" stdDeviation="2" />
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur_901_1022"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_backgroundBlur_901_1022"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
export { 가끔비또는눈_낮 };
