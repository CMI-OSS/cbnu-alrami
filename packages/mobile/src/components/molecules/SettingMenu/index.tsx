import { NavLink } from "react-router-dom";

import $ from "./style.module.scss";

interface Props {
  route: {
    id: number;
    icon: any;
    label: string;
    to: string;
  };
  config?: string;
}

export default function SettingMenu({ route, config }: Props) {
  const { id, label, to } = route;

  return (
    <NavLink key={id} to={to} className={$["setting-menu"]}>
      <div className={$["icon-box"]}>
        <route.icon className={$.icon} />
      </div>
      <span>{label}</span>
      <span className={$.config}>{config}</span>
    </NavLink>
  );
}
