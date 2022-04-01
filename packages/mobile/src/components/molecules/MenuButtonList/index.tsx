import Flicking from "@egjs/react-flicking";
import MenuButton from "../../atoms/MenuButton";
import $ from "./style.module.scss";

function MenuButtonList() {
  const items = ["학교", "음식점"];

  return (
    <Flicking
      className={$.flicking}
      moveType="freeScroll"
      bound
      align="prev"
      horizontal
    >
      <div className={$.wrap}>
        {items.map((item, index) => (
          <MenuButton
            // eslint-disable-next-line react/no-array-index-key
            key={`button-${index}`}
            menuButtonItem={item}
          ></MenuButton>
        ))}
      </div>
    </Flicking>
  );
}

export default MenuButtonList;
