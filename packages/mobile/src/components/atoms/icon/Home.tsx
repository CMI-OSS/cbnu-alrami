import { IconProps } from "src/type/props";

function Home({ size, stroke }: IconProps) {
  return (
    <svg
      width={size}
      height="100%"
      viewBox="0 0 16 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.48535 6.99993L8.44274 1L15.082 6.99993"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.1665 5.55664V13.0001H13.4064V5.55664"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.28372 7.4668C8.57938 7.46609 8.87225 7.52467 9.14541 7.63917C9.41857 7.75368 9.66661 7.92183 9.87518 8.13391C10.0838 8.34599 10.2487 8.59779 10.3606 8.87478C10.4724 9.15176 10.5289 9.44843 10.5268 9.74764V12.9677H6.0459V9.74764C6.0459 9.147 6.28167 8.57095 6.70134 8.14623C7.12101 7.72151 7.69021 7.4829 8.28372 7.4829V7.4668Z"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export { Home };
