import { ChangeEvent } from "react";
import { useLocation, useHistory } from "react-router-dom";
import queryString from "query-string";
import useQuery from "src/hooks/useQuery";
import { getScnarioGroups } from "src/lib/scenario";
import scenarios from "src/__mockData__/noticeScenarios";
import getStyle from "./style";

interface Props {
  isNotice: boolean;
}

export default function ScenarioFilter({ isNotice }: Props) {
  const style = getStyle();
  const history = useHistory();
  const location = useLocation();
  const query = useQuery();

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
              value={query.get("group") || "all"}
            >
              <option value="all" key="all">
                모두
              </option>
              {getScnarioGroups(scenarios).map((group) => (
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
            value={query.get("state") || "all"}
          >
            <option value="all">전체</option>
            <option value="clean">원활</option>
            <option value="warning">경고</option>
            <option value="error">장애</option>
            <option value="excluded">배제</option>
          </select>
        </label>
      </li>
    </ul>
  );
}
