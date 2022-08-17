/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import classNames from "classnames";
import { Dayjs } from "dayjs";
import { cafeteriaList } from "src/__mocks__";
import { useCafeteria } from "src/api/cafeteria";
import BorderBox from "src/components/atoms/BorderBox";
import Button from "src/components/atoms/Button";
import { Food, Setting, Write } from "src/components/atoms/icon";
import Line from "src/components/atoms/Line";
import {
  get대표식당,
  isShown선택안함가이드,
  set대표식당,
  unset선택안함가이드,
} from "src/utils/storage";

import $ from "./style.module.scss";

type Props = {
  today: Dayjs;
  isHoliday: boolean;
};

const FOOD_TIME = {
  breakfast: {
    weekday: "07:20 ~ 09:00",
    holiday: "08:00 ~ 09:00",
  },
  lunch: {
    weekday: "11:30 ~ 13:30",
    holiday: "12:00 ~ 13:00",
  },
  dinner: {
    weekday: "17:30 ~ 19:10",
    holiday: "17:30 ~ 19:10",
  },
} as const;

function FinalGuideRestaurant() {
  const handleUnshowGuide = () => {
    unset선택안함가이드();
  };

  return (
    <div className={classNames($.cafeteria, $["show-final-guide"])}>
      <BorderBox height={188} className={$["border-box"]}>
        <p className={$["final-guide-description"]}>
          홈화면에서 다시 식단을 보고싶다면 <br />
          <span>
            <Setting size={14} stroke="#5e5e5e" /> 설정 &gt; 대표식당에서 다시
            선택해주세요.
          </span>
        </p>
        <Button onClick={handleUnshowGuide} text="확인" className={$.button} />
      </BorderBox>
    </div>
  );
}

function GuideRestaurant() {
  const handleShowModal = () => {
    set대표식당("선택안함");
  };
  return (
    <div
      className={classNames($.cafeteria, $["show-guide"])}
      onClick={handleShowModal}
    >
      <BorderBox height={188} className={$["border-box"]}>
        <div className={$["food-icon"]}>
          <Food size={18} stroke="#aaa" />
        </div>
        <span className={$["guide-main-description"]}>
          화면을 눌러 대표식당을 선택해주세요.
        </span>
        <p className={$["guide-sub-description"]}>
          대표식당을 선택하면
          <br />
          홈화면에서 식단을 볼 수 있어요.
          <br />
          홈화면에서 식단을 보고싶지 않다면 <br />
          “표시 안함”을 선택해주세요.
          <br />
        </p>
      </BorderBox>
    </div>
  );
}

function Restaurant({ today, isHoliday }: Props) {
  if (isShown선택안함가이드()) {
    return <FinalGuideRestaurant />;
  }
  const allCafeteriaData = useCafeteria(today.format("YYYY-MM-DD"));
  const representativeCafeteriaName = get대표식당();
  if (!representativeCafeteriaName) {
    return <GuideRestaurant />;
  }
  const target = cafeteriaList.find(({ name }) => {
    return name === representativeCafeteriaName;
  });
  if (!target) return <div>메뉴 선택 오류</div>;
  const { data } = allCafeteriaData[target.id - 1];
  if (!data) return <div>메뉴 불러오기 오류</div>;

  let menu;
  let mealType;
  let period;
  // const currentHour = today.hour();
  const currentHour = 12;

  const [ breakfast, lunch, dinner ] = data.data;

  if (currentHour >= 0 && currentHour < 10) {
    menu = breakfast;
    mealType = "아침";
    period = isHoliday
      ? FOOD_TIME.breakfast.holiday
      : FOOD_TIME.breakfast.weekday;
  }
  if (currentHour >= 10 && currentHour < 13) {
    menu = lunch;
    mealType = "점심";
    period = isHoliday ? FOOD_TIME.lunch.holiday : FOOD_TIME.lunch.weekday;
  }
  if (currentHour >= 13 && currentHour < 24) {
    menu = dinner;
    mealType = "저녁";
    period = isHoliday ? FOOD_TIME.dinner.holiday : FOOD_TIME.dinner.weekday;
  }

  return (
    <div className={$.cafeteria}>
      <BorderBox height="auto" className={$["menu-box"]}>
        <div className={$.title}>
          <div className={$.location}>
            <span>{`${representativeCafeteriaName} ${mealType}`}</span>
            <Write stroke="#aaa" size={12} />
          </div>
          <span className={$.time}>{period}</span>
        </div>
        <Line />
        <div className={$["cafeteria-content"]}>
          {menu ? menu.content : "지금은 식단이 없어요"}
        </div>
      </BorderBox>
    </div>
  );
}

export default Restaurant;
