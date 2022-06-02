import type { StyleProps } from "src/type/props";

function Position({ className, style }: StyleProps) {
  return (
    <svg
      width="17"
      height="22"
      viewBox="0 0 17 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.9908 13.0226C15.1137 11.5353 15.6455 9.68644 15.4839 7.83165C15.3222 5.97686 14.4786 4.24722 13.1152 2.97555C11.829 1.70972 10.0948 1 8.28786 1C6.48095 1 4.74671 1.70972 3.46052 2.97555C2.09986 4.24915 1.25872 5.9791 1.09856 7.83337C0.938388 9.68765 1.47047 11.5356 2.59269 13.0226L8.28786 20.921L13.9908 13.0226Z"
        stroke="#AAAAAA"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.1793 10.9436C9.75413 10.9436 11.0308 9.67027 11.0308 8.09948C11.0308 6.52869 9.75413 5.25531 8.1793 5.25531C6.60448 5.25531 5.32784 6.52869 5.32784 8.09948C5.32784 9.67027 6.60448 10.9436 8.1793 10.9436Z"
        stroke="#AAAAAA"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export { Position };
