import { Internet, Share, Star } from "src/components/atoms/icon";
import { StyleProps } from "src/type/props";

import $ from "./style.module.scss";

function Footer({ className }: StyleProps) {
  return (
    <div className={$.footer}>
      <Share size={24} stroke="#C3C3C3" />
      <Star size={27} stroke="#C3C3C3" />
      <Internet size={28} stroke="#C3C3C3" />
    </div>
  );
}

export default Footer;
