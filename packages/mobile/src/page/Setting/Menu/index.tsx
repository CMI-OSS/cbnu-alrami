import { NavLink } from "react-router-dom";

import { useAppDispatch } from "src/store";
import { setOrigin } from "src/store/boardSlice";
import { showSettingContact } from "src/store/settingSlice";

import $ from "./style.module.scss";

type Props = {
  route: {
    icon: any;
    label: string;
    to: string;
  };
  config?: string;
};

function Menu({ route, config }: Props) {
  const { label, to } = route;
  const dispatch = useAppDispatch();

  const modalList = label === "문의하기";
  const handleClick = (e: React.MouseEvent) => {
    if (modalList) {
      e.preventDefault();
      dispatch(showSettingContact({ isDisplayContact: true }));
    }
    if (label === "구독/알림") {
      dispatch(setOrigin({ origin: "" }));
    }
  };

  return (
    <>
      <NavLink
        key={to}
        to={to}
        className={$["setting-menu"]}
        onClick={handleClick}
      >
        <div className={$["icon-box"]}>
          <route.icon size={18} stroke="#5e5e5e" />
        </div>
        <span className={$.label}>{label}</span>
        {config && <span className={$.config}>{config}</span>}
      </NavLink>
    </>
  );
}

export default Menu;
