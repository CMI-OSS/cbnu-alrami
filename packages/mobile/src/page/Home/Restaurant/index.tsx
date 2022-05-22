/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import classNames from "classnames";
import BorderBox from "src/components/atoms/BorderBox";
import Button from "src/components/atoms/Button";
import { Food, Setting, Write } from "src/components/atoms/icon";
import Line from "src/components/atoms/Line";
import {
  isShown선택안함가이드,
  unset선택안함가이드,
  get대표식당,
  set대표식당,
} from "src/utils/storage";

import $ from "./style.module.scss";

function FinalGuideRestaurant() {
  const handleUnshowGuide = () => {
    unset선택안함가이드();
  };

  return (
    <div className={classNames($.cafeteria, $["show-final-guide"])}>
      <BorderBox height={188}>
        <p>
          홈화면에서 다시 식단을 보고싶다면 <br />
          <span>
            <Setting width="14" height="15" /> 설정 &gt; 대표식당에서 다시
            선택해주세요.
          </span>
        </p>
        <Button onClick={handleUnshowGuide} text="확인" />
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
      <BorderBox height={188}>
        <Food width="18" height="22" />
        <span>화면을 눌러 대표식당을 선택해주세요.</span>
        <p>
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
function Restaurant() {
  if (!get대표식당()) {
    return <GuideRestaurant />;
  }
  if (isShown선택안함가이드()) {
    return <FinalGuideRestaurant />;
  }
  return (
    <div className={$.cafeteria}>
      <BorderBox height={188}>
        <div className={$.title}>
          <div className={$.location}>
            본관 아침
            <Write />
          </div>
          <span className={$.time}>7:30~9:00</span>
        </div>
        <Line />
        <div className={$["cafeteria-content"]}>
          흰밥/우유(두유)/김치 단호박스프 고구마치즈롤까스 &소스 양상추샐러드
          오리엔탈드레싱 시금치나물 에너지:1165Kcal 단백질:16g
        </div>
      </BorderBox>
    </div>
  );
}

export default Restaurant;
