import { ChangeEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import queryString from "query-string";
import scenarios from "src/__mockData__/noticeScenarios";
import { useQuery } from "src/hooks";
import { getScenarioGroups } from "src/lib/scenario";

import $ from "./style.module.scss";

interface Props {
  isNotice: boolean;
}

export default function ScenarioFilter({ isNotice }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const query = useQuery();

  const getQueryParams = () => {
    return queryString.parse(location.search);
  };

  const handleGroupChange = ({
    target: { value },
  }: ChangeEvent<HTMLSelectElement>) => {
    const query = queryString.stringify({ ...getQueryParams(), group: value });
    navigate(`${location.pathname}?${query}`);
  };

  const handleStateChange = ({
    target: { value },
  }: ChangeEvent<HTMLSelectElement>) => {
    const query = queryString.stringify({ ...getQueryParams(), state: value });
    navigate(`${location.pathname}?${query}`);
  };

  return (
    <ul className={$.filter}>
      {isNotice && (
        <li>
          <label htmlFor="groupSelector">
            그룹 필터
            <select
              onChange={handleGroupChange}
              id="groupSelector"
              value={query.get("group") || "all"}
            >
              <option value="all" key="all">
                모두
              </option>
              {getScenarioGroups(scenarios).map((group) => {
                return (
                  <option value={group} key={group}>
                    {group}
                  </option>
                );
              })}
            </select>
          </label>
        </li>
      )}
      <li>
        <label htmlFor="stateSelector">
          상태 필터
          <select
            onChange={handleStateChange}
            id="stateSelector"
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
