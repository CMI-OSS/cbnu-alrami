import { NavLink } from "react-router-dom";

import classNames from "classnames";

import $ from "./style.module.scss";

type Props = {
  route: {
    id: number;
    icon: any;
    label: string;
    to: string;
  };
};

function NavigationLink({ route }: Props) {
  return (
    <NavLink
      key={route.id}
      to={route.to}
      className={({ isActive }) => classNames($.link, { [$.active]: isActive })}
    >
      <route.icon />
      <p className={$.label}>{route.label}</p>
    </NavLink>
  );
}

export default NavigationLink;
