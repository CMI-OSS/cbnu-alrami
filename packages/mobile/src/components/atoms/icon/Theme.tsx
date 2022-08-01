import { StyleProps } from "src/type/props";

function Theme({ className, style }: StyleProps) {
  return (
    <svg
      {...{ className, style }}
      width="20"
      height="22"
      viewBox="0 0 20 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.00049 21.3651L8.00049 17.7285"
        stroke="#5E5E5E"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.00049 4.63662L8.00049 1"
        stroke="#5E5E5E"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.9104 11.1825L16.0011 11.1825"
        stroke="#5E5E5E"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.6419 18.8239L13.46 16.6419"
        stroke="#5E5E5E"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.5847 5.96649L15.6418 3.9093"
        stroke="#5E5E5E"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="8.00057"
        cy="11.1825"
        r="7.45057"
        stroke="#5E5E5E"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.00049 3.54562V18.8194"
        stroke="#5E5E5E"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 5L7.63662 7.9093"
        stroke="#5E5E5E"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.80884 7.57755L7.56419 12.5929"
        stroke="#5E5E5E"
        strokeWidth="1.1"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        d="M1 12L8.27324 18.5459"
        stroke="#5E5E5E"
        strokeWidth="1.1"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export { Theme };
