import Modal from "src/components/templates/Modal";

import $ from "./style.module.scss";

export default function SettingContact() {
  return (
    <Modal type="single" dimmed className={$.contact}>
      <div className={$.list}>
        <span className={$.name}>ynda11111@naver.com</span>
        <span className={$.name}>jarycoco@gmail.com</span>
      </div>
    </Modal>
  );
}
