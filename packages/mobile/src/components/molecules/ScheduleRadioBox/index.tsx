import { ChangeEventHandler } from "react";

import ScheduleRadioButton from "src/components/atoms/ScheduleRadioButton";
import { ScheduleType } from "src/page/Calendar";

import $ from "./style.module.scss";

type Props = {
  toggle: ScheduleType;
  onToggleChange: ChangeEventHandler<HTMLInputElement>;
};

function ScheduleRadioBox({ toggle, onToggleChange }: Props) {
  return (
    <section className={$["radio-box"]}>
      <ScheduleRadioButton
        labelText="개인 일정"
        value="personal"
        isChecked={toggle === "personal"}
        onChange={onToggleChange}
      />
      <ScheduleRadioButton
        labelText="학사 일정"
        value="college"
        isChecked={toggle === "college"}
        onChange={onToggleChange}
      />
    </section>
  );
}

export default ScheduleRadioBox;
