import { NavLink } from "react-router-dom";

import { StyleProps } from "src/type/props";

import { AddSchedule } from "../../../components/atoms/icon";

function AddScheduleLink({ className }: StyleProps) {
  return (
    <NavLink to="" className={className}>
      <AddSchedule />
    </NavLink>
  );
}

export default AddScheduleLink;
