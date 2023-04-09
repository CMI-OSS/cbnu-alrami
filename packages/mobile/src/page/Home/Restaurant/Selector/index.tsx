import classNames from "classnames";
import BorderBox from "src/components/atoms/BorderBox";
import { CAFETERIA_LIST } from "src/consts";
import useModal from "src/hooks/useModal";
import { Restaurant } from "src/type";

import ConfirmModal from "./ComfirmModal";
import $ from "./style.module.scss";

type Props = {
  cafeteriaName: Restaurant;
  onSelectorCancel: () => void;
  onCafeteriaSelect: (name: Restaurant) => void;
  className?: string;
};

const SELECTOR_ITEMS = [
  ...CAFETERIA_LIST,
  { name: "표시 안함", id: 0 },
] as const;

function Selector({
  cafeteriaName,
  onSelectorCancel,
  onCafeteriaSelect,
  className,
}: Props) {
  const { isOpen, handleModalClose, handleModalOpen } = useModal();

  const handleSelect = (name: Restaurant) => {
    if (name === "표시 안함") {
      handleModalOpen();
      return;
    }
    onCafeteriaSelect(name);
  };

  const handleAgreeClick = () => {
    return onCafeteriaSelect("표시 안함");
  };

  return (
    <div className={$["dimmed-box"]}>
      <BorderBox
        height="auto"
        width={328}
        className={classNames($.selector, className)}
      >
        <span className={$["selector-title"]}>식당 선택</span>
        <div className={$["top-gradient-box"]}></div>
        <ul className={$.list}>
          {SELECTOR_ITEMS.map(({ name, id }) => {
            return (
              <li key={id} className={$.item}>
                <button
                  type="button"
                  className={classNames($.button, {
                    [$.selected]: name === cafeteriaName,
                  })}
                  onClick={() => {
                    return handleSelect(name as Restaurant);
                  }}
                  aria-label={`${name} 선택하기`}
                >
                  {name}
                </button>
              </li>
            );
          })}
        </ul>
        <button type="button" className={$.cancel} onClick={onSelectorCancel}>
          취소
        </button>
        <div className={$["bottom-gradient-box"]}></div>
      </BorderBox>
      {isOpen && (
        <ConfirmModal
          onAgreeClick={handleAgreeClick}
          onCancelClick={handleModalClose}
        >
          <p className={$.description}>
            홈화면에 식단을 표시하지
            <br />
            않으시겠습니까?
          </p>
        </ConfirmModal>
      )}
    </div>
  );
}

export default Selector;
