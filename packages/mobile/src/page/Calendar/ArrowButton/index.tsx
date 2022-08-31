import { Arrow } from "../../../components/atoms/icon";
import $ from "./style.module.scss";

type Props = {
  direction: "left" | "right";
  onClick: () => void;
};

function ArrowButton({ direction, onClick }: Props) {
  return (
    <button
      className={$.button}
      type="button"
      onClick={onClick}
      aria-label={`${direction === "left" ? "이전" : "다음"}으로 이동`}
    >
      {direction === "left" ? (
        <Arrow size={6} stroke="#aaa" />
      ) : (
        <Arrow size={6} stroke="#aaa" style={{ transform: "rotate(180deg)" }} />
      )}
    </button>
  );
}

export default ArrowButton;
