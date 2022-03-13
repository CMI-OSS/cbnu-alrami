import type { StyleProps } from "src/type/props";

function 구름조금_밤({ className, style }: StyleProps) {
  return (
    <svg
      {...{ className, style }}
      width="73"
      height="62"
      viewBox="0 0 73 62"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M44.1485 29.2912C48.0865 37.3752 57.8322 40.7363 65.9162 36.7984C66.651 36.4405 67.3468 36.0346 68.0015 35.5863C68.8849 34.9815 70.2319 35.8185 69.7636 36.7813C67.6119 41.2045 64.019 44.9668 59.2541 47.2879C47.9364 52.801 34.2924 48.0955 28.7793 36.7778C23.2662 25.4602 27.9717 11.8162 39.2894 6.30308C44.0544 3.98194 49.2317 3.47215 54.041 4.50457C55.0877 4.72927 54.9165 6.30586 53.8957 6.62864C53.1391 6.8679 52.3906 7.16554 51.6557 7.52348C43.5717 11.4614 40.2106 21.2071 44.1485 29.2912Z"
        fill="#FFECAA"
      />
      <g filter="url(#filter0_b_421_288)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M48.4631 61.2435C48.693 61.2625 48.9255 61.2722 49.1605 61.2722C53.5893 61.2722 57.1796 57.8262 57.1796 53.5754C57.1796 50.9009 55.7583 48.545 53.6011 47.1655C54.1104 45.9395 54.3905 44.6018 54.3905 43.2015C54.3905 37.2873 49.3953 32.4929 43.2334 32.4929C40.7365 32.4929 38.431 33.2802 36.572 34.6103C34.2549 30.745 29.9085 28.1423 24.9288 28.1423C18.1661 28.1423 12.5714 32.9423 11.6413 39.1863C11.5962 39.1858 11.551 39.1855 11.5057 39.1855C5.15127 39.1855 0 44.1297 0 50.2287C0 56.3276 5.15117 61.2718 11.5055 61.2719V61.2721H48.4631V61.2435Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_b_421_288"
          x="-4"
          y="24.1423"
          width="65.1797"
          height="41.1299"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImage" stdDeviation="2" />
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur_421_288"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_backgroundBlur_421_288"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
export { 구름조금_밤 };
