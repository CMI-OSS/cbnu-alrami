import { useState } from "react";

import BorderBox from "src/components/atoms/BorderBox";
import { Food } from "src/components/atoms/icon";
import RadioSelect from "src/components/molecules/RadioSelect";
import SettingTemplate from "src/page/Setting/SettingTemplate";

import $ from "./style.module.scss";

const cafeterias = [
  "표시 안함",
  "본관",
  "양성재",
  "양진재",
  "별빛식당",
  "은하수식당",
  "한빛식당",
];

function Cafeteria() {
  const [ representative, setRepresentative ] = useState("표시 안함");

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
              handleChange={setRepresentative}
            />
          );
        })}
      </BorderBox>
    </SettingTemplate>
  );
}

export default Cafeteria;
