import MenuButton from "@components/atoms/MenuButton";

import $ from "./style.module.scss";

function MenuButtonList() {
  const items = [ "학교", "식사", "편리", "간식", "놀거리" ];

  return (
    <div className={$.wrap}>
      {items.map((item, index) => {
        return (
          <MenuButton
            // eslint-disable-next-line react/no-array-index-key
            key={`button-${index}`}
            menuButtonItem={item}
          ></MenuButton>
        );
      })}
    </div>
  );
}

export default MenuButtonList;
