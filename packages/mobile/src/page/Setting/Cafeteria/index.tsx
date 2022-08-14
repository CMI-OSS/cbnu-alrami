import { useCallback, useState } from "react";

import BorderBox from "src/components/atoms/BorderBox";
import { Food } from "src/components/atoms/icon";
import RadioSelect from "src/components/molecules/RadioSelect";
import SettingTemplate from "src/page/Setting/SettingTemplate";
import { Restaurant } from "src/type";
import { get대표식당, set대표식당 } from "src/utils/storage";

import { cafeterias } from "../Main/constants";
import $ from "./style.module.scss";

function Cafeteria() {
  const representativeCafeteria = get대표식당();
  const [ representative, setRepresentative ] = useState(representativeCafeteria);

  const handleRepresentative = useCallback((label: Restaurant) => {
    setRepresentative(label);
    set대표식당(label);
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
              isChecked={representative === label}
              handleChange={handleRepresentative}
            />
          );
        })}
      </BorderBox>
    </SettingTemplate>
  );
}

export default Cafeteria;
