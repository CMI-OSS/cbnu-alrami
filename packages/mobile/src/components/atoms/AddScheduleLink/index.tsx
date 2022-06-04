import { NavLink } from "react-router-dom";

import classNames from "classnames";
import { StyleProps } from "src/type/props";

import { AddSchedule } from "../icon";
import $ from "./style.module.scss";

function AddScheduleLink({ className }: StyleProps) {
  return (
    <NavLink to="" className={classNames(className, $.link)}>
      <AddSchedule />
    </NavLink>
  );
}

export default AddScheduleLink;
