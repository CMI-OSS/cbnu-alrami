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
                    return onCafeteriaSelect(name as Restaurant);
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
    </div>
  );
}

export default Selector;
