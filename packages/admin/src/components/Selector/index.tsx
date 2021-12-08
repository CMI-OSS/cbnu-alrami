import { StatusType } from "src/store/statusType";
import { ChangeEvent } from "react";
import { noticeGroupsMockData } from "src/__mockData__";
import { ScraperType } from "src/store/scraperType";
import { useAppDispatch, useAppSelector } from "src/store";
import { setGroup, setStatus, view } from "src/store/viewSlice";
import getStyle from "./style";

export default function Selector() {
  const { scraper } = useAppSelector(view);

  const dispatch = useAppDispatch();

  const style = getStyle();

  const handleGroupChange = ({
    target: { value },
  }: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setGroup(value));
  };

  const handleStatusChange = ({
    target: { value },
  }: ChangeEvent<HTMLSelectElement>) => {
    if (value === StatusType.All) {
      dispatch(setStatus(StatusType.All));
      return;
    }
    if (value === StatusType.Running) {
      dispatch(setStatus(StatusType.Running));
      return;
    }
    if (value === StatusType.Waiting) {
      dispatch(setStatus(StatusType.Waiting));
      return;
    }
    if (value === StatusType.Error) {
      dispatch(setStatus(StatusType.Error));
    }
  };

  return (
    <ul className={style.selectorContainer}>
      {scraper === ScraperType.Notice && (
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
              {noticeGroupsMockData.map((group) => (
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
            <option value={StatusType.All}>{StatusType.All}</option>
            <option value={StatusType.Running}>{StatusType.Running}</option>
            <option value={StatusType.Waiting}>{StatusType.Waiting}</option>
            <option value={StatusType.Error}>{StatusType.Error}</option>
          </select>
        </label>
      </li>
    </ul>
  );
}
