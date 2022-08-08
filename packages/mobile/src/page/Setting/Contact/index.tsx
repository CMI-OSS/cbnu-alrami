import React from "react";

import Modal from "@components/templates/Modal";
import { useAppDispatch } from "src/store";
import { showSettingContact } from "src/store/settingSlice";

import $ from "./style.module.scss";

function Contact() {
  const dispatch = useAppDispatch();

  const handleModalClose = (e: React.MouseEvent) => {
    dispatch(showSettingContact({ isDisplayContact: false }));
  };
  return (
    <Modal
      type="single"
      dimmed
      className={$.contact}
      handleModalClose={handleModalClose}
    >
      <div className={$.list}>
        <span className={$.name}>ynda11111@naver.com</span>
        <span className={$.name}>jarycoco@gmail.com</span>
      </div>
    </Modal>
  );
}

export default Contact;
