import { IconProps } from "src/type/props";

function AppVersion({ size, stroke }: IconProps) {
  return (
    <svg
      width={size}
      height="100%" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.565 1.46385L1.92471 5.67843C1.55031 5.86106 1.55031 6.39458 1.92471 6.57721L10.7842 10.8987C10.9226 10.9662 11.0843 10.9662 11.2226 10.8987L20.0821 6.57721C20.4565 6.39459 20.4565 5.86106 20.0821 5.67843L11.4418 1.46385C11.1651 1.32888 10.8417 1.32888 10.565 1.46385Z" stroke={stroke} strokeWidth="1.2" strokeLinecap="square"/>
      <path d="M2.73214 9.27734L1.78764 9.84221C1.44851 10.045 1.46759 10.5426 1.82125 10.7188L10.4612 15.0249C10.6017 15.0949 10.7669 15.0949 10.9073 15.0249L19.5473 10.7188C19.901 10.5426 19.92 10.045 19.5809 9.84221L18.6364 9.27734" stroke={stroke} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2.73214 13.1689L1.78764 13.7338C1.44851 13.9366 1.46759 14.4342 1.82125 14.6104L10.4612 18.9165C10.6017 18.9865 10.7669 18.9865 10.9073 18.9165L19.5473 14.6104C19.901 14.4342 19.92 13.9366 19.5809 13.7338L18.6364 13.1689" stroke={stroke} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export { AppVersion };
