import React from "react";

import classNames from "classnames";

import $ from "./style.module.scss";

type Props = {
  children: React.ReactNode;
  type: string;
  dimmed?: boolean;
  className?: string;
};

function ModalPageTemplate({ children, type, dimmed, className }: Props) {
  return (
    <>
      <div className={classNames($.wrap, className)}>
        {children}
        <div className={$.buttons}>
          {type === "double" && (
            <button type="button" className={$.cancel}>
              취소
            </button>
          )}
          <button type="button" className={$.confirm}>
            확인
          </button>
        </div>
      </div>
      {dimmed && <div className={$.dimmed}></div>}
    </>
  );
}

export default ModalPageTemplate;
