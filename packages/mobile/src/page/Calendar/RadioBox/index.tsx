import { ChangeEventHandler } from "react";

import { ScheduleType } from "src/page/Calendar";
import RadioButton from "src/page/Calendar/RadioButton";

import $ from "./style.module.scss";

type Props = {
  toggle: ScheduleType;
  onToggleChange: ChangeEventHandler<HTMLInputElement>;
};

function RadioBox({ toggle, onToggleChange }: Props) {
  return (
    <section className={$["radio-box"]}>
      <RadioButton
        labelText="학사일정"
        value="all"
        isChecked={toggle === "all"}
        onChange={onToggleChange}
      />
      <RadioButton
        labelText="즐겨찾기"
        value="bookmark"
        isChecked={toggle === "bookmark"}
        onChange={onToggleChange}
      />
    </section>
  );
}

export default RadioBox;
