import { IconProps } from "src/type/props";

function Internet({ size, stroke }: IconProps) {
  return (
    <svg
      width={size}
      height="100%"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse
        cx="10.9879"
        cy="11.0335"
        rx="9.9845"
        ry="9.96663"
        stroke={stroke}
        strokeWidth="1.2"
      />
      <path
        d="M11.019 1.06689L10.988 20.8767"
        stroke={stroke}
        strokeWidth="1.2"
      />
      <path
        d="M9.87848 1.00024C6.52979 4.10192 1.84163 12.4442 9.87848 21"
        stroke={stroke}
        strokeWidth="1.2"
      />
      <path
        d="M12.0971 20.9998C15.4458 17.8981 20.134 9.55578 12.0971 0.999993"
        stroke={stroke}
        strokeWidth="1.2"
      />
      <path
        d="M1.03467 9.60968C4.13157 12.2958 12.461 16.0563 21.0037 9.60968"
        stroke={stroke}
        strokeWidth="1.2"
      />
      <path
        d="M1.74756 14.5928C4.62326 16.7417 12.3578 19.7501 20.2902 14.5928"
        stroke={stroke}
        strokeWidth="1.2"
      />
      <path
        d="M3.17383 4.62622C5.65119 6.77509 12.2575 9.78351 18.8638 4.62622"
        stroke={stroke}
        strokeWidth="1.2"
      />
    </svg>
  );
}

export { Internet };
