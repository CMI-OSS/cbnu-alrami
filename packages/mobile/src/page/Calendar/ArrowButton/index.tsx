import { MoreArrow } from "../../../components/atoms/icon";
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
        <MoreArrow className={$.rotated} width="7px" height="16px" />
      ) : (
        <MoreArrow width="7px" height="16px" />
      )}
    </button>
  );
}

export default ArrowButton;
