type Props = {
  width: string;
  height: string;
  color: string;
};

function Share({ color, width, height }: Props) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.3582 9.03281C3.20513 9.03281 3.8917 8.34624 3.8917 7.49932C3.8917 6.65239 3.20513 5.96582 2.3582 5.96582C1.51128 5.96582 0.824707 6.65239 0.824707 7.49932C0.824707 8.34624 1.51128 9.03281 2.3582 9.03281Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.9754 4.43052C11.8223 4.43052 12.5089 3.74395 12.5089 2.89702C12.5089 2.0501 11.8223 1.36353 10.9754 1.36353C10.1285 1.36353 9.44189 2.0501 9.44189 2.89702C9.44189 3.74395 10.1285 4.43052 10.9754 4.43052Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.9754 13.3634C11.8223 13.3634 12.5089 12.6768 12.5089 11.8299C12.5089 10.983 11.8223 10.2964 10.9754 10.2964C10.1285 10.2964 9.44189 10.983 9.44189 11.8299C9.44189 12.6768 10.1285 13.3634 10.9754 13.3634Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.57676 3.80005L4.07324 7.04783"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.69434 8.23438L9.30614 11.3794"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export { Share };
