import type { StyleProps } from "src/type/props";

function Close({ className, style }: StyleProps) {
  return (
    <svg className={className} width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.626343 12.0417L11.6263 1.49999" stroke="#AAAAAA" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M11.9199 12.0417L0.919922 1.49999" stroke="#AAAAAA" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  )
}
export { Close };
