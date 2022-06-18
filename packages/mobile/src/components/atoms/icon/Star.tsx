import type { StyleProps } from "src/type/props";

type Props = {
  width?: string;
  height?: string;
} & StyleProps;

function Star({ className, style, width = "20", height = "20" }: Props) {
  return (
    <svg
      className={className}
      style={style}
      width={width}
      height={height}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.08106 11.1722C3.00321 11.1722 2.92768 11.1457 2.86691 11.097C2.80586 11.047 2.76135 10.9797 2.73922 10.904C2.7171 10.8282 2.71839 10.7475 2.74293 10.6725L3.78887 7.40393L1.15147 5.42551C1.0888 5.37678 1.04239 5.31019 1.01838 5.23452C0.994362 5.15885 0.993873 5.07768 1.01698 5.00173C1.0377 4.92695 1.08203 4.86087 1.14337 4.81334C1.20471 4.76581 1.27977 4.73938 1.35736 4.73799H4.64471L5.75828 1.25377C5.77951 1.18004 5.82433 1.11531 5.88586 1.06948C5.9474 1.02365 6.02225 0.99925 6.09897 1.00002C6.1757 1.00078 6.25005 1.02668 6.31065 1.07373C6.37126 1.12078 6.41477 1.1864 6.43453 1.26053L7.48198 4.73799H10.713C10.7906 4.73955 10.8657 4.76613 10.927 4.81379C10.9884 4.86144 11.0327 4.92762 11.0534 5.00248C11.0764 5.0785 11.0758 5.15973 11.0516 5.2354C11.0275 5.31107 10.9809 5.37763 10.9181 5.42626L8.27845 7.38891L9.26729 10.6785C9.29035 10.7534 9.29036 10.8335 9.26732 10.9084C9.24427 10.9833 9.19923 11.0496 9.13805 11.0985C9.0788 11.1453 9.00567 11.1711 8.93018 11.1718C8.85469 11.1724 8.78111 11.148 8.72102 11.1023L6.016 9.07353L3.28544 11.1031C3.22661 11.1476 3.15488 11.1719 3.08106 11.1722V11.1722Z"
        fill="#5E5E5E"
        stroke="#5E5E5E"
        strokeWidth="1.2"
        strokeMiterlimit="10"
      />
    </svg>
  );
}

export { Star };
