import { NavLink } from "react-router-dom";

import CardList from "@components/molecules/CardList";
import Footer from "@components/molecules/Footer";
import classNames from "classnames";
import { mockCategory, mockNotification } from "src/__mocks__";
import guideEmptyStar from "src/assets/guide_empty_star.png";
import guideEmptySubscription from "src/assets/guide_empty_subscription.png";
import { Plus, Setting, Star } from "src/components/atoms/icon";
import useSearch from "src/hooks/useSearch";

import $ from "./style.module.scss";

function EmptyGuideImage({ major }: { major: string }) {
  if (major === "즐겨찾기") {
    return <img src={guideEmptyStar} alt="즐겨찾기 항목 미존재" />;
  }
  return <img src={guideEmptySubscription} alt="구독 공지사항 미존재" />;
}

function Notification() {
  const mockSubscribeNotification = 1;
  const mockStarNotification = 0;
  const major = useSearch({ target: "major" })!;
  const guideImageViewCondition =
    (major === "즐겨찾기" && !mockStarNotification) ||
    (major !== "즐겨찾기" && !mockSubscribeNotification);
  return (
    <section className={$.notification}>
      <header className={$.header}>
        공지사항
        <div className={$.icons}>
          <Setting width="21px" height="22px" className={$.setting} />
          <Plus width="20px" height="20px" />
        </div>
      </header>
      <div className={$.categories}>
        <NavLink
          className={({ isActive }) =>
            classNames($.category, { [$.active]: isActive })
          }
          to="?major=즐겨찾기"
        >
          <Star className={$.star} width="12" height="12" />
        </NavLink>
        {mockCategory.map((category) => (
          <NavLink
            to={category.to}
            className={({ isActive }) =>
              classNames($.category, { [$.active]: isActive })
            }
          >
            {category.major}
          </NavLink>
        ))}
      </div>
      <div
        className={$["notification-list"]}
        style={guideImageViewCondition ? { alignItems: "center" } : {}}
      >
        {guideImageViewCondition ? (
          <EmptyGuideImage {...{ major }} />
        ) : (
          <CardList notifications={mockNotification} />
        )}
      </div>
      <Footer />
    </section>
  );
}

export default Notification;
