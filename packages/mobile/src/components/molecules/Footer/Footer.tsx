import { AiOutlineHome } from "react-icons/ai";
import styles from "./style.scss";

function Footer() {
  return (
    <footer>
      <div className={styles.item}>
        <AiOutlineHome className={styles.icon} />홈
      </div>
      <div className={styles.item}>
        <AiOutlineHome className={styles.icon} />
        공지사항
      </div>
      <div className={styles.item}>
        <AiOutlineHome className={styles.icon} />
        학사일정
      </div>
      <div className={styles.item}>
        <AiOutlineHome className={styles.icon} />
        식당
      </div>
      <div className={styles.item}>
        <AiOutlineHome className={styles.icon} />
        더보기
      </div>
    </footer>
  );
}

export default Footer;
