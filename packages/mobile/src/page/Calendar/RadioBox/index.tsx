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
        labelText="개인 일정"
        value="personal"
        isChecked={toggle === "personal"}
        onChange={onToggleChange}
      />
      <RadioButton
        labelText="학사 일정"
        value="college"
        isChecked={toggle === "college"}
        onChange={onToggleChange}
      />
    </section>
  );
}

export default RadioBox;
