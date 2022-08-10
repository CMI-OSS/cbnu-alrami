import { NavLink } from "react-router-dom";

import { Plus } from "src/components/atoms/icon";
import { StyleProps } from "src/type/props";

function AddScheduleLink({ className }: StyleProps) {
  return (
    <NavLink to="" className={className}>
      <Plus size={16} stroke="#aaa" />
    </NavLink>
  );
}

export default AddScheduleLink;
