import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { LeftArrow } from "@components/atoms/icon";

import $ from "./style.module.scss";

type Props = {
  title: string;
};

function MapHeader({ title }: Props) {
  const navigate = useNavigate();
  const {state} = useLocation();
  return (
    <div className={$.header}>
      <NavLink to="./" className={$.link} state={state} onClick={() => {
        navigate(-1);
      }}>
        <LeftArrow stroke="#aaa" size={16} />
        <span className="blind">뒤로 가기</span>
      </NavLink>
      <strong className={$.title}>{title}</strong>
    </div>
  );
}

export default MapHeader;
