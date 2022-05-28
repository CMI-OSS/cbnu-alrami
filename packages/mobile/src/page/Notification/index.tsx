import Footer from "@components/molecules/Footer";
import { Setting, Plus, Star } from "src/components/atoms/icon";

import $ from "./style.module.scss";

function Notification() {
  return (
    <section className={$.notification}>
      <header className={$.header}>
        공지사항
        <div className={$.icons}>
          <Setting style={{ marginRight: "35px" }} />
          <Plus />
        </div>
      </header>
      <div className={$.categories}>
        <div className={$.category}>
          <Star />
        </div>
        <div className={$.category}>최신공지사항최신공지사항최신공지사항</div>
        <div className={$.category}>최신공지사항최신공지사항최신공지사항</div>
        <div className={$.category}>최신공지사항최신공지사항최신공지사항</div>
        <div className={$.category}>최신공지사항최신공지사항최신공지사항</div>
        <div className={$.category}>최신공지사항최신공지사항최신공지사항</div>
        <div className={$.category}>최신</div>
      </div>
      <Footer />
    </section>
  );
}

export default Notification;
