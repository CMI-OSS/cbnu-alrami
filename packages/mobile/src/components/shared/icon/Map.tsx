import type { StyleProps } from "src/type/props";

function Map({ className, style }: StyleProps) {
  return (
    <svg
      style={{ color: "red" }}
      width="18"
      height="25"
      viewBox="0 0 18 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.2859 14.5784C16.5508 12.8987 17.1499 10.8106 16.9678 8.71576C16.7857 6.62093 15.8353 4.66745 14.2995 3.23122C12.8507 1.80157 10.8971 1 8.8616 1C6.82613 1 4.87254 1.80157 3.42366 3.23122C1.89089 4.66963 0.943362 6.62346 0.762935 8.7177C0.582508 10.8119 1.1819 12.899 2.44606 14.5784L8.8616 23.4991L15.2859 14.5784Z"
        stroke="#D6D6D6"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.73948 12.2304C10.5135 12.2304 11.9516 10.7923 11.9516 9.01829C11.9516 7.24427 10.5135 5.80615 8.73948 5.80615C6.96547 5.80615 5.52734 7.24427 5.52734 9.01829C5.52734 10.7923 6.96547 12.2304 8.73948 12.2304Z"
        stroke="#D6D6D6"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export { Map };
