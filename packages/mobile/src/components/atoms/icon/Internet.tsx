type Props = {
  width: string;
  height: string;
  color: string;
};

function Internet({ color, width, height }: Props) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="6" cy="6" r="5.5" stroke={color} />
      <path d="M6 1V11" stroke={color} />
      <path d="M1.5 2.80005C4 5.30005 8 5.30005 10.5 2.80005" stroke={color} />
      <path d="M0.5 6.80005C3 9.5 9 9.5 11.5 6.80005" stroke={color} />
      <path d="M7 0.5C9.5 4 9.5 8 7 11.5" stroke={color} />
      <path d="M5 11.5C2.5 8 2.5 4 5 0.5" stroke={color} />
    </svg>
  );
}

export { Internet };
