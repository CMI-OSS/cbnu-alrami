import { Status } from "@admin/store/statusEnum";
import { ChangeEvent } from "react";
import { noticeGroupsMockData } from "@admin/__mockData__";
import { Scrapers } from "@admin/store/scraperEnum";
import { useAppDispatch, useAppSelector } from "@admin/store";
import { setGroup, setStatus, view } from "@admin/store/viewSlice";
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
    if (value === Status.All) {
      dispatch(setStatus(Status.All));
      return;
    }
    if (value === Status.Running) {
      dispatch(setStatus(Status.Running));
      return;
    }
    if (value === Status.Waiting) {
      dispatch(setStatus(Status.Waiting));
      return;
    }
    if (value === Status.Error) {
      dispatch(setStatus(Status.Error));
    }
  };

  return (
    <ul className={style.selectorContainer}>
      {scraper === Scrapers.Notice && (
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
            <option value={Status.All}>{Status.All}</option>
            <option value={Status.Running}>{Status.Running}</option>
            <option value={Status.Waiting}>{Status.Waiting}</option>
            <option value={Status.Error}>{Status.Error}</option>
          </select>
        </label>
      </li>
    </ul>
  );
}
