import { StyleProps } from "src/type/props";

import $ from "./style.module.scss";

type Props = {
  height: number;
  children: React.ReactNode;
} & StyleProps;

function Card({ className, height, children, style }: Props) {
  return (
    <div className={$.card} style={{ ...style, height: `${height}px` }}>
      {children}
    </div>
  );
}

export default Card;
