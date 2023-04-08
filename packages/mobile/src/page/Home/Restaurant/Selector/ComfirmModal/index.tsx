import $ from "./style.module.scss";

type Props = {
  onCancelClick: () => void;
  onAgreeClick: () => void;
};

function ConfirmModal({ onCancelClick, onAgreeClick }: Props) {
  return (
    <div className={$["confirm-dimmed-box"]}>
      <div className={$["confirm-modal"]}>
        <span className={$.description}>
          홈화면에 식단을 표시하지
          <br />
          않으시겠습니까?
        </span>
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
