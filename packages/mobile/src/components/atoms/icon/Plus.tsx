import { IconProps } from "src/type/props";

function Plus({ size, stroke }: IconProps) {
  return (
    <svg
      width={size}
      height="100%"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.25342 6.86353C0.977276 6.86353 0.753418 7.08738 0.753418 7.36353C0.753418 7.63967 0.977276 7.86353 1.25342 7.86353V6.86353ZM13.29 7.86353C13.5661 7.86353 13.79 7.63967 13.79 7.36353C13.79 7.08738 13.5661 6.86353 13.29 6.86353V7.86353ZM1.25342 7.86353H13.29V6.86353H1.25342V7.86353Z"
        fill={stroke}
      />
      <path
        d="M6.77197 13.3635C6.77197 13.6397 6.99583 13.8635 7.27197 13.8635C7.54812 13.8635 7.77197 13.6397 7.77197 13.3635H6.77197ZM7.77197 1.36353C7.77197 1.08738 7.54812 0.863525 7.27197 0.863525C6.99583 0.863525 6.77197 1.08738 6.77197 1.36353H7.77197ZM7.77197 13.3635L7.77197 1.36353H6.77197L6.77197 13.3635H7.77197Z"
        fill={stroke}
      />
    </svg>
  );
}

export { Plus };
