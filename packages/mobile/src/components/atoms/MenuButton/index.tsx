import $ from "./style.module.scss";

type Props = {
  menuButtonItem: string;
};

function MenuButton({ menuButtonItem }: Props) {
  return (
    <button type="button" className={$.wrap} aria-pressed="false">
      {menuButtonItem}
    </button>
  );
}

export default MenuButton;
