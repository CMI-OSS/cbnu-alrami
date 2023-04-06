import { Link } from "react-router-dom";

import { CMIAppLogo, HomeSetting } from "src/components/atoms/icon";

import $ from "./style.module.scss";

export default function HomeHeader() {
  return (
    <header className={$.header}>
      <CMIAppLogo size={29} />
      <Link className={$.link} to="/setting">
        <HomeSetting size={24} stroke="#AAAAAA" />
      </Link>
    </header>
  );
}
