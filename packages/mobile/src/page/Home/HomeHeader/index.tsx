import { Link } from "react-router-dom";

import { CMIAppLogo, Setting } from "src/components/atoms/icon";

import $ from "./style.module.scss";

export default function HomeHeader() {
  return (
    <header className={$.header}>
      <CMIAppLogo size={29} />
      <Link to="/setting">
        <Setting size={24} stroke="#100d0d" />
      </Link>
    </header>
  );
}
