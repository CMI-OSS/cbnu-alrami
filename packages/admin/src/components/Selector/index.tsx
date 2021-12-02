import { StatusConfig, StatusContext } from "@admin/utils/statusContext";
import { ChangeEvent, useContext } from "react";
import { noticeGroupsMocks } from "@admin/__mocks__";
import { GroupContext } from "@admin/utils/groupContext";
import { ScrapperConfig, ScrapperContext } from "@admin/utils/scrapperContext";
import getStyle from "./style";

export default function Selector() {
  const { setGroup } = useContext(GroupContext);
  const { scrapper } = useContext(ScrapperContext);
  const { setStatus } = useContext(StatusContext);

  const { all, running, waiting, error } = StatusConfig;
  const style = getStyle();

  const handleGroupChange = ({
    target: { value },
  }: ChangeEvent<HTMLSelectElement>) => {
    setGroup(value);
  };

  const handleStatusChange = ({
    target: { value },
  }: ChangeEvent<HTMLSelectElement>) => {
    let newState;

    // FIXME: setStatus() 함수는 StatusConfig enum을 인자로 받아야 하나
    // onChange 이벤트 target의 value는 string이기 때문에 긴 switch 구문을 사용함.
    // 역시 리덕스 적용 시 다듬어야 할 부분인 것 같습니다.

    switch (value) {
      case running:
        newState = running;
        break;
      case waiting:
        newState = waiting;
        break;
      case error:
        newState = error;
        break;
      default:
        newState = all;
    }
    setStatus(newState);
  };

  return (
    <ul className={style.selectorContainer}>
      {scrapper === ScrapperConfig.notice && (
        <li>
          <label htmlFor="groupSelector">
            그룹 필터
            <select
              onChange={handleGroupChange}
              className={style.selector}
              id="groupSelector"
            >
              <option value="모두보기" key="모두보기">
                모두
              </option>
              {noticeGroupsMocks.map((group) => (
                <option value={group} key={group}>
                  {group}
                </option>
              ))}
            </select>
          </label>
        </li>
      )}
      <li>
        <label htmlFor="statusSelector">
          상태 필터
          <select
            onChange={handleStatusChange}
            className={style.selector}
            id="statusSelector"
          >
            <option value={all}>{all}</option>
            <option value={running}>{running}</option>
            <option value={waiting}>{waiting}</option>
            <option value={error}>{error}</option>
          </select>
        </label>
      </li>
    </ul>
  );
}
