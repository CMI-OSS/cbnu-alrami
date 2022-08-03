import { NavLink } from "react-router-dom";

import $ from "./style.module.scss";

type ItemProps = {
  id: number;
  name: string;
  path: string;
};

type Props = {
  list: ItemProps[];
  handleSelectMenu: (idx: number) => void;
  menuType: number;
};

function ChipGroup({ list, handleSelectMenu, menuType }: Props) {
  return (
    <div className={$.menu}>
      <div className={$.list}>
        {list.map((item, idx) => {
          return (
            <NavLink
              key={`menu-${item.id}`}
              to={item.path}
              className={$["menu-link"]}
              onClick={() => handleSelectMenu(idx)}
              aria-selected={menuType === idx + 1}
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
