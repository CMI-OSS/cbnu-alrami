import { ReactComponentElement } from "react";
import { NavLink } from "react-router-dom";
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
      className={({ isActive }) => (isActive ? $.active : "")}
    >
      <route.icon />
      <p>{route.label}</p>
    </NavLink>
  );
}

export default NavigationLink;
