import BorderBox from "src/components/atoms/BorderBox";

import $ from "./style.module.scss";

type Props = {
  onClick: () => void;
  className?: string;
};

function Greeting({ onClick, className }: Props) {
  return (
    <button
      type="button"
      {...{ className, onClick }}
      aira-label="대표 식당 선택하기"
    >
      <BorderBox height={188} width={312} className={$.box}>
        <span className={$.message}>
          화면을 눌러 홈화면에 표시할 식당을
          <br /> 선택해주세요
        </span>
      </BorderBox>
    </button>
  );
}

export default Greeting;
