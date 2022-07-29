import { NavLink } from "react-router-dom";

import $ from "./style.module.scss";

interface Props {
  route: {
    id: number;
    icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    label: string;
    to: string;
    width: string;
    height: string;
  };
  config?: string;
}

export default function SettingMenu({ route, config }: Props) {
  const { id, label, to, width, height } = route;
  const modalList = label === "문의하기";
  const handleModalShow = (e: React.MouseEvent) => {
    if (modalList) e.preventDefault();
  };

  return (
    <>
      <NavLink
        key={id}
        to={to}
        className={$["setting-menu"]}
        onClick={handleModalShow}
      >
        <div className={$["icon-box"]}>
          <route.icon className={$.icon} style={{ width, height }} />
        </div>
        <span className={$.label}>{label}</span>
        {config && <span className={$.config}>{config}</span>}
      </NavLink>
    </>
  );
}
