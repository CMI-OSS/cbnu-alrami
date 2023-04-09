import { IconProps } from "src/type/props";

function Reload({ size, stroke }: IconProps) {
  return (
    <svg
      width={size}
      height="100%"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.1 10.9199C18.1 15.3599 14.5 18.9699 10.05 18.9699C5.6 18.9699 2 15.3699 2 10.9199C2 6.46988 5.61 2.87988 10.05 2.87988C10.94 2.87988 11.69 2.99988 12.54 3.26988"
        stroke={stroke}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 1L13.4478 3.67804L10.6903 5.2553"
        stroke={stroke}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export { Reload };
