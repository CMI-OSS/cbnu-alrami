import { ReactNode } from "react";

import $ from "./style.module.scss";

type Props = {
  onCancelClick: () => void;
  onAgreeClick: () => void;
  children: ReactNode;
};

function ConfirmModal({ onCancelClick, onAgreeClick, children }: Props) {
  return (
    <div className={$["confirm-dimmed-box"]}>
      <div className={$["confirm-modal"]}>
        {children}
        <div className={$["button-box"]}>
          <button
            type="button"
            aria-label="선택 취소하기"
            className={$.button}
            onClick={onCancelClick}
          >
            취소
          </button>
          <button
            type="button"
            aria-label="식단 표시하지 않기"
            className={$.button}
            onClick={onAgreeClick}
          >
            표시안함
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
