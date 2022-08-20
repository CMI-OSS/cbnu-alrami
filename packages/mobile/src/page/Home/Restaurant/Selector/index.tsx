import classNames from "classnames";
import { CAFETERIA_LIST } from "src/__mocks__";
import BorderBox from "src/components/atoms/BorderBox";
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
  { name: "선택안함", id: 0 },
] as const;

function Selector({
  cafeteriaName,
  onSelectorCancel,
  onCafeteriaSelect,
  className,
}: Props) {
  return (
    <BorderBox height="auto" className={classNames($.selector, className)}>
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
    </BorderBox>
  );
}

export default Selector;
