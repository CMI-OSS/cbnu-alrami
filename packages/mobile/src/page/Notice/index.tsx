import { Link } from "react-router-dom";

import Footer from "@components/molecules/Footer";
import guideEmptyStar from "src/assets/guide_empty_star.png";
import guideEmptySubscription from "src/assets/guide_empty_subscription.png";
import { Setting } from "src/components/atoms/icon";
import useSearch from "src/hooks/useSearch";
import Category from "src/page/Notice/Category";

import NotificationList from "./NotificationList";
import $ from "./style.module.scss";

function EmptyGuideImage({ major }: { major: string }) {
  return (
    <img
      src={major === "즐겨찾기" ? guideEmptyStar : guideEmptySubscription}
      alt={
        major === "즐겨찾기" ? "즐겨찾기 항목 미존재" : "구독 공지사항 미존재"
      }
    />
  );
}

function Notice() {
  const mockSubscribeNotification = 1;
  const mockStarNotification = 0;
  const major = useSearch({ target: "major" })!;
  const guideImageViewCondition =
    (major === "즐겨찾기" && !mockStarNotification) ||
    (major !== "즐겨찾기" && !mockSubscribeNotification);

  return (
    <section className={$.notice}>
      <div className={$["header-wrapper"]}>
        <header className={$.header}>
          <span>공지사항</span>
          <Link to="/subscription/setting">
            <Setting width="21px" height="22px" className={$.setting} />
          </Link>
        </header>
        <Category />
      </div>
      <div className={$["notification-list-wrapper"]}>
        {guideImageViewCondition ? (
          <EmptyGuideImage {...{ major }} />
        ) : (
          <NotificationList />
        )}
      </div>
      <Footer />
    </section>
  );
}

export default Notice;
