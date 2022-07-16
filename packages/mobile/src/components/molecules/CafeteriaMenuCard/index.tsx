import BorderBox from "src/components/atoms/BorderBox";
import Line from "src/components/atoms/Line";

import $ from "./style.module.scss";

interface Props {
  mealTime: string;
  timeInfo: string;
  mealMenu: string;
  calory: string;
}

export default function index({ mealTime, timeInfo, mealMenu, calory }: Props) {
  return (
    <BorderBox className={$["cafeteria-menu-card"]} height="fit-content">
      <div className={$.time}>
        <span>{mealTime}</span>
        <span className={$["time-info"]}>{timeInfo}</span>
      </div>
      <Line />
      <div className={$.meal}>
        <span>{mealMenu}</span>
        <span className={$["meal-calory"]}>{calory}</span>
      </div>
    </BorderBox>
  );
}
