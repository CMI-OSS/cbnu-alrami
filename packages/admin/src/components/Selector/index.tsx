import { Status, StatusContext } from "src/utils/statusContext";
import { ChangeEvent, useContext } from "react";
import { noticeGroupsMockData } from "src/__mockData__";
import { GroupContext } from "src/utils/groupContext";
import { Scrapers, ScraperContext } from "src/utils/scraperContext";
import getStyle from "./style";

export default function Selector() {
  const { setGroup } = useContext(GroupContext);
  const { scraper } = useContext(ScraperContext);
  const { setStatus } = useContext(StatusContext);

  const style = getStyle();

  const handleGroupChange = ({
    target: { value },
  }: ChangeEvent<HTMLSelectElement>) => {
    setGroup(value);
  };

  const handleStatusChange = ({
    target: { value },
  }: ChangeEvent<HTMLSelectElement>) => {
    if (value === Status.All) {
      setStatus(Status.All);
      return;
    }
    if (value === Status.Running) {
      setStatus(Status.Running);
      return;
    }
    if (value === Status.Waiting) {
      setStatus(Status.Waiting);
      return;
    }
    if (value === Status.Error) {
      setStatus(Status.Error);
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
