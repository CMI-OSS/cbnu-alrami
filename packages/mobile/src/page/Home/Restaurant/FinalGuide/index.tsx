import classNames from "classnames";
import BorderBox from "src/components/atoms/BorderBox";
import Button from "src/components/atoms/Button";
import { Setting } from "src/components/atoms/icon";

import $ from "./style.module.scss";

type Props = {
  onClick: () => void;
  className?: string;
};

function FinalGuide({ onClick, className }: Props) {
  return (
    <BorderBox height="auto" className={classNames($.box, className)}>
      <div className={$.description}>
        홈화면에서 다시 식단을 보고싶다면
        <span className={$.second}>
          <div className={$.icon}>
            <Setting size={14} stroke="#5e5e5e" />
          </div>
          설정 &gt; 대표식당에서 다시 선택해주세요.
        </span>
      </div>
      <Button
        onClick={onClick}
        text="확인"
        className={$.button}
        aira-label="안내창 닫기"
      />
    </BorderBox>
  );
}

export default FinalGuide;
