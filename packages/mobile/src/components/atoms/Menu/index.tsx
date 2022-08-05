import $ from "./style.module.scss";

type Props = {
  menus: string[];
};

function Menu({ menus }: Props) {
  return (
    <menu className={$.menu}>
      {menus.map((menu) => {
        return (
          <div key={menu} radioGroup={menu}>
            {menu}
          </div>
        );
      })}
    </menu>
  );
}

export default Menu;
