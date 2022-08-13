import { NavLink } from "react-router-dom";

import BorderBox from "src/components/atoms/BorderBox";
import { Map } from "src/components/atoms/icon";

import $ from "./style.module.scss";

type Props = {
  buildingNumber?: string;
  oldBuildingNumber?: string;
  name: string;
  address: string;
};
function Info({ buildingNumber, oldBuildingNumber, name, address }: Props) {
  return (
    <>
      <BorderBox className={$.info}>
        <div className={$["info-inner"]}>
          <span className={$.text}>
            {buildingNumber} / {oldBuildingNumber}
          </span>
          <strong className={$.title}>{name}</strong>
          <ul className={$.list}>
            <li className={$.item}>
              <Map size={14} stroke="#aaa" />
              <span className={$["item-text"]}>{address}</span>
            </li>
          </ul>
          <div className={$.error}>
            <NavLink className={$["error-link"]} to="/error">
              오류 신고
            </NavLink>
          </div>
        </div>
      </BorderBox>
    </>
  );
}

export default Info;
