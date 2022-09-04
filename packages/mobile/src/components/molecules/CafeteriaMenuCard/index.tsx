import BorderBox from "src/components/atoms/BorderBox";
import Line from "src/components/atoms/Line";

import $ from "./style.module.scss";

type Props = {
  mealTime: string;
  timeInfo: string;
  mealMenu: string;
  calorie?: string;
};

function CafeteriaMenuCard({ mealTime, timeInfo, mealMenu, calorie }: Props) {
  return (
    <BorderBox className={$["cafeteria-menu-card"]} height="fit-content">
      <div className={$.time}>
        <span className={$["meal-time"]}>{mealTime}</span>
        <span className={$["time-info"]}>{timeInfo}</span>
      </div>
      <Line />
      <div className={$.meal}>
        <span className={$["meal-menu"]}>{mealMenu}</span>
        {calorie && <span className={$["meal-calorie"]}>{calorie}</span>}
      </div>
    </BorderBox>
  );
}

export default CafeteriaMenuCard;
