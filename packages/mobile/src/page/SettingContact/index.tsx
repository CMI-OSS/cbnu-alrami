import ModalPageTemplate from "src/components/templates/ModalPageTemplate";

import $ from "./style.module.scss";

export default function SettingContact() {
  return (
    <ModalPageTemplate type="single" dimmed className={$.contact}>
      <div className={$.list}>
        <span className={$.name}>ynda11111@naver.com</span>
        <span className={$.name}>jarycoco@gmail.com</span>
      </div>
    </ModalPageTemplate>
  );
}
