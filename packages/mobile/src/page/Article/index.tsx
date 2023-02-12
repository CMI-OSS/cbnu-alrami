import { Link } from "react-router-dom";

import { Setting } from "@components/atoms/icon";
import Footer from "@components/molecules/Footer";
import Slider from "src/page/Article/components/Slider";

import $ from "./style.module.scss";

function Article() {
  return (
    <div className={$.article}>
      <div className={$.header}>
        <span>공지사항</span>
        <Link to="/subscription">
          <Setting size={20} />
        </Link>
      </div>
      <Slider />
      <div className={$.content}></div>
      <Footer />
    </div>
  );
}

export default Article;
