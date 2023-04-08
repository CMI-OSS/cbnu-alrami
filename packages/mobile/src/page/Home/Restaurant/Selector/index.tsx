import { useState } from "react";

import classNames from "classnames";
import BorderBox from "src/components/atoms/BorderBox";
import { CAFETERIA_LIST } from "src/consts";
import { Restaurant } from "src/type";

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
  const [ isConfirmOpen, setIsConfirmOpen ] = useState(false);

  const handleSelect = (name: Restaurant) => {
    if (name === "표시 안함") {
      setIsConfirmOpen(true);
      return;
    }
    onCafeteriaSelect(name);
  };

  const handleCloseConfirmModal = () => {
    return setIsConfirmOpen(false);
  };

  const handleAgree = () => {
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
        <ul>
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
      </BorderBox>
      {isConfirmOpen && (
        <div className={$["confirm-dimmed-box"]}>
          <div className={$["confirm-modal"]}>
            <span className={$.description}>
              홈화면에 식단을 표시하지
              <br />
              않으시겠습니까?
            </span>
            <div className={$["button-box"]}>
              <button type="button" aria-label="선택 취소하기" className={$.button} onClick={handleCloseConfirmModal}>
                취소
              </button>
              <button type="button" aria-label="식단 표시하지 않기" className={$.button} onClick={handleAgree}>
                표시안함
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Selector;
