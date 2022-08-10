import { Link } from "react-router-dom";

import Footer from "@components/molecules/Footer";
import useSearch from "@hooks/useSearch";
import { Setting } from "src/components/atoms/icon";
import Category from "src/page/Notice/Category";

import NoticeList from "./NoticeList";
import $ from "./style.module.scss";

function Notice() {
  const target = useSearch({ target: "type" }) || "new";

  return (
    <section className={$.notice}>
      <div className={$["header-wrapper"]}>
        <header className={$.header}>
          <span>공지사항</span>
          <Link to="/subscription/setting">
            <Setting size={20} stroke="#aaa" />
          </Link>
        </header>
        <Category target={target} />
      </div>
      <div className={$["notification-list-wrapper"]}>
        <NoticeList target={target} />
      </div>
      <Footer />
    </section>
  );
}

export default Notice;
