import { NavLink } from "react-router-dom";

import $ from "./style.module.scss";

type ItemProps = {
  id: number;
  name: string;
  path: string;
};

type Props = {
  list: ItemProps[];
  handleSelectMenu: () => void;
  selectedMenu?: number;
};

function ChipGroup({ list, handleSelectMenu, selectedMenu }: Props) {
  return (
    <div className={$.menu}>
      <div className={$.list}>
        {list.map((item, idx) => {
          return (
            <NavLink
              key={`menu-${item.id}`}
              to={item.path}
              className={$["menu-link"]}
              onClick={() => {
                return handleSelectMenu();
              }}
              aria-selected={selectedMenu === idx}
            >
              {item.name}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}

export default ChipGroup;
