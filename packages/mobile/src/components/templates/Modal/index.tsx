import React from "react";

import classNames from "classnames";

import $ from "./style.module.scss";

type Props = {
  children: React.ReactNode;
  type: string;
  dimmed?: boolean;
  className?: string;
  handleModalClose?: (e: React.MouseEvent) => void;
};

function Modal({ children, type, dimmed, className, handleModalClose }: Props) {
  return (
    <>
      <div className={classNames($.wrap, className)}>
        {children}
        <div className={$.buttons}>
          {type === "double" && (
            <button
              type="button"
              className={$.cancel}
              onClick={handleModalClose}
            >
              취소
            </button>
          )}
          <button
            type="button"
            className={$.confirm}
            onClick={handleModalClose}
          >
            확인
          </button>
        </div>
      </div>
      {dimmed && <div className={$.dimmed}></div>}
    </>
  );
}

export default Modal;
