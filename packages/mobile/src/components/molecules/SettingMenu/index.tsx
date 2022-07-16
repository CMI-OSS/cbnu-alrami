import { NavLink } from "react-router-dom";

interface Props {
  route: {
    id: number;
    icon: any;
    label: string;
    to: string;
  };
}
export default function SettingMenu({ route }: Props) {
  const { id, label, to } = route;

  return (
    <NavLink key={id} to={to}>
      <route.icon />
      <span>{label}</span>
    </NavLink>
  );
}
