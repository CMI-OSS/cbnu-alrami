import { NavLink } from "react-router-dom";

import Footer from "@components/molecules/Footer";
import classNames from "classnames";
import { Setting, Plus, Star } from "src/components/atoms/icon";

import $ from "./style.module.scss";

function Notification() {
  const mockCategory = [
    { major: "경영정보학과", to: "?major=경영정보학과" },
    { major: "소프트웨어학과", to: "?major=소프트웨어학과" },
    { major: "안전공학과", to: "?major=안전공학과" },
    { major: "어떤학과", to: "?major=어떤학과" },
    { major: "이런학과저런학과", to: "?major=이런학과저런학과" },
  ];

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
      <Footer />
    </section>
  );
}

export default Notification;
