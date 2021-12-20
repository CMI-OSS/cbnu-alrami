import { StatusType } from "src/store/statusType";
import { ChangeEvent } from "react";
import { noticeGroupsMockData } from "src/__mockData__";
import { useLocation, useHistory } from "react-router-dom";
import queryString from "query-string";
import getStyle from "./style";

interface Props {
  isNotice: boolean;
}

export default function ScenarioFilter({ isNotice }: Props) {
  const style = getStyle();
  const history = useHistory();
  const location = useLocation();

  const getQueryParams = () => queryString.parse(location.search);

  const handleGroupChange = ({
    target: { value },
  }: ChangeEvent<HTMLSelectElement>) => {
    const query = queryString.stringify({ ...getQueryParams(), group: value });
    history.push(`${location.pathname}?${query}`);
  };

  const handleStatusChange = ({
    target: { value },
  }: ChangeEvent<HTMLSelectElement>) => {
    const query = queryString.stringify({ ...getQueryParams(), state: value });
    history.push(`${location.pathname}?${query}`);
  };

  return (
    <ul className={style.selectContainer}>
      {isNotice && (
        <li>
          <label htmlFor="groupSelector" className={style.label}>
            그룹 필터
            <select
              onChange={handleGroupChange}
              className={style.select}
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
            className={style.select}
            id="statusSelector"
          >
            <option value={StatusType.All}>{StatusType.All}</option>
            <option value={StatusType.Clean}>{StatusType.Clean}</option>
            <option value={StatusType.Warning}>{StatusType.Warning}</option>
            <option value={StatusType.Error}>{StatusType.Error}</option>
            <option value={StatusType.Excluded}>{StatusType.Excluded}</option>
          </select>
        </label>
      </li>
    </ul>
  );
}
