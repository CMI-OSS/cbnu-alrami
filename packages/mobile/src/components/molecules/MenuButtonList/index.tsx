import MenuButton from "@components/atoms/MenuButton";

import $ from "./style.module.scss";

function MenuButtonList() {
  const items = [ "학교", "음식점" ];

  return (
    <div className={$.wrap}>
      {items.map((item, index) => (
        <MenuButton
          // eslint-disable-next-line react/no-array-index-key
          key={`button-${index}`}
          menuButtonItem={item}
        ></MenuButton>
      ))}
    </div>
  );
}

export default MenuButtonList;
