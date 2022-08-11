import { Internet, Share, Star } from "src/components/atoms/icon";
import { StyleProps } from "src/type/props";

import $ from "./style.module.scss";

type Props = {
  articleId: number;
  bookmark?: boolean;
} & StyleProps;

function Footer({ articleId, bookmark, className }: Props) {
  const handleBookmark = () => {
    console.log(articleId, "hi");
  };

  return (
    <div className={$.footer}>
      <Share size={24} stroke="#C3C3C3" />
      <button type="button" onClick={handleBookmark}>
        <Star
          size={27}
          stroke={bookmark ? "#D66D6E" : "#C3C3C3"}
          fill={bookmark ? "#D66D6E" : ""}
        />
      </button>
      <Internet size={28} stroke="#C3C3C3" />
    </div>
  );
}

export default Footer;
