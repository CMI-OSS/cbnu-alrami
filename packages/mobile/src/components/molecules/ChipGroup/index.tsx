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
  position: string;
};

function ChipGroup({ list, handleSelectMenu, position }: Props) {
  const checkMenu = (position: string) => {
    switch (position) {
      case "all":
        return 0;
      case "north":
        return 1;
      case "east":
        return 2;
      case "south":
        return 3;
      default:
        return 0;
    }
  };

  return (
    <div className={$.menu}>
      <div className={$.list}>
        {list.map((item, idx) => {
          return (
            <NavLink
              key={`menu-${item.id}`}
              to={item.path}
              className={$["menu-link"]}
              onClick={() => handleSelectMenu()}
              aria-selected={checkMenu(position) === idx}
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
