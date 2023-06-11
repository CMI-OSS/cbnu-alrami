import { NavLink, useLocation } from "react-router-dom";

import Icon from "@components/atoms/icon/Icon";
import * as icons from "@components/atoms/icon/svg";
import classNames from "classnames";
import { DefaultProps } from "src/type/props";

import $ from "./style.module.scss";

type Props = {
  route: {
    id: number;
    icon: keyof typeof icons;
    label: string;
    to: string;
  };
} & DefaultProps;

function NavigationLink({ className, route }: Props) {
  const { id, to, icon, label } = route;
  const { pathname } = useLocation();
  const isActive = pathname.includes(to);

  return (
    <NavLink
      key={id}
      to={to}
      className={classNames($.link, { [$.active]: isActive }, className)}
    >
      <Icon name={icon} color={isActive ? "#d66d6e" : "#aaa"} size={22} />
      <p className={$.label}>{label}</p>
    </NavLink>
  );
}

export default NavigationLink;
