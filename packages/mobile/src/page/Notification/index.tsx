import { NavLink } from "react-router-dom";

import CardList from "@components/molecules/CardList";
import Footer from "@components/molecules/Footer";
import classNames from "classnames";
import { Setting, Plus, Star } from "src/components/atoms/icon";
import useSearch from "src/hooks/useSearch";

import $ from "./style.module.scss";

function EmptyGuideImage({ major }: { major: string }) {
  if (major === "즐겨찾기") {
    return <div>즐겨찾기없는가이드이미지</div>;
  }
  return <div>공지없는가이드이미지</div>;
}

function Notification() {
  const mockCategory = [
    { major: "경영정보학과", to: "?major=경영정보학과" },
    { major: "소프트웨어학과", to: "?major=소프트웨어학과" },
    { major: "안전공학과", to: "?major=안전공학과" },
    { major: "어떤학과", to: "?major=어떤학과" },
    { major: "이런학과저런학과", to: "?major=이런학과저런학과" },
  ];

  const mockNotification = [
    {
      id: 1,
      category: "충북대학교",
      title: "충북대학교 인문대학 영상 공모전 안내1",
      date: "22-04-22",
      view: 123,
      star: 55,
    },
    {
      id: 2,
      category: "충북대학교",
      title: "충북대학교 인문대학 영상 공모전 안내2",
      date: "22-04-22",
      view: 123,
      star: 55,
    },
    {
      id: 3,
      category: "충북대학교",
      title: "충북대학교 인문대학 영상 공모전 안내3",
      date: "22-04-22",
      view: 123,
      star: 55,
    },
  ];

  const mockSubscribeNotification = 1;
  const mockStarNotification = 2;
  const major = useSearch({ target: "major" })!;

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
      <div className={$["notification-list"]}>
        {(major === "즐겨찾기" && !mockStarNotification) ||
        (major !== "즐겨찾기" && !mockSubscribeNotification) ? (
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
