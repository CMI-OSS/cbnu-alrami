import classNames from "classnames";
import BorderBox from "src/components/atoms/BorderBox";
import { Write } from "src/components/atoms/icon";
import Line from "src/components/atoms/Line";
import { Restaurant } from "src/type";

import $ from "./style.module.scss";

type Props = {
  className?: string;
  cafeteriaName: Omit<Restaurant, "선택안함">;
  onClick: () => void;
};

function EmptyCafeteria({ className, cafeteriaName, onClick }: Props) {
  return (
    <BorderBox height="auto" className={classNames($["menu-box"], className)}>
      <div className={$["cafeteria-header"]}>
        <button type="button" aria-label="대표 식당 변경하기" onClick={onClick}>
          <span className={$["cafeteria-name"]}>{cafeteriaName}</span>
          <Write stroke="#aaa" size={12} />
        </button>
        <span className={$.time}></span>
      </div>
      <Line />
      <div className={$["food-box"]}>
        <span className={$["empty-menu"]}>지금은 식단이 없어요</span>
      </div>
    </BorderBox>
  );
}

export default EmptyCafeteria;
