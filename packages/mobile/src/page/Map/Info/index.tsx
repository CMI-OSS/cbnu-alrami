import BorderBox from "src/components/atoms/BorderBox";
import { Call, Map } from "src/components/atoms/icon";

import $ from "./style.module.scss";

type Props = {
  buildingNumber?: string;
  oldBuildingNumber?: string;
  name: string;
  address: string;
  contact?: string;
};
function Info({
  buildingNumber,
  oldBuildingNumber,
  name,
  address,
  contact,
}: Props) {
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
            <li className={$.item}>
              <Call size={14} stroke="#c4c4c4" />
              <span className={$["item-text"]}>{contact}</span>
            </li>
          </ul>
          {/* [D] 식당 스펙 적용 후 작업 예정 */}
          {/* <div className={$.error}>
            <NavLink className={$["error-link"]} to="/error">
              오류 신고
            </NavLink>
          </div> */}
        </div>
      </BorderBox>
    </>
  );
}

export default Info;
