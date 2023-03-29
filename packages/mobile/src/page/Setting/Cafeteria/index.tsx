import { useCallback, useState } from "react";

import BorderBox from "src/components/atoms/BorderBox";
import { Food } from "src/components/atoms/icon";
import RadioSelect from "src/components/molecules/RadioSelect";
import SettingTemplate from "src/page/Setting/SettingTemplate";
import { Restaurant } from "src/type";
import { getSelectedCafeteria, setSelectedCafeteria } from "src/utils/storage";

import { cafeterias } from "../Main/constants";
import $ from "./style.module.scss";

function Cafeteria() {
  const selectedCafeteria = getSelectedCafeteria();
  const [ selected, setSelected ] = useState(selectedCafeteria);

  const handleSelectedCafeteria = useCallback((label: Restaurant) => {
    setSelected(label);
    setSelectedCafeteria(label);
  }, []);

  return (
    <SettingTemplate title="대표식당">
      <div className={$["setting-cafeteria"]}>
        <Food size={32} stroke="#aaa" />
        <span className={$.text}>
          홈화면에 표시할
          <br />
          식당을 선택해주세요
        </span>
      </div>

      <BorderBox className={$["select-cafeteria"]}>
        {cafeterias.map((label) => {
          return (
            <RadioSelect
              key={label}
              label={label}
              className={$["radio-select"]}
              isChecked={selected === label}
              handleChange={handleSelectedCafeteria}
            />
          );
        })}
      </BorderBox>
    </SettingTemplate>
  );
}

export default Cafeteria;
