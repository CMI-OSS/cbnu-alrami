import { Internet, Share, Star } from "src/components/atoms/icon";

import $ from "./style.module.scss";

function Footer() {
  return (
    <div className={$.footer}>
      <Share width="24" height="24" color="#C3C3C3" />
      <Star className={$.star} width="27" height="27" color="#C3C3C3" />
      <Internet width="28" height="28" color="#C3C3C3" />
    </div>
  );
}

export default Footer;
