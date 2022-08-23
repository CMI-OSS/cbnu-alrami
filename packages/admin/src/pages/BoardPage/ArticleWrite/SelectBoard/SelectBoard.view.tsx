import styles from "./SelectBoard.module.scss";

interface Option {
  text: string;
  value: string;
}

export interface Props {
  options: Array<Option>;
  value: string;
  onSelectBoardView: React.ChangeEventHandler<HTMLSelectElement>;
}

export default function SelectBoardView({
  options,
  value,
  onSelectBoardView,
}: Props) {
  return (
    <select
      onChange={onSelectBoardView}
      value={value}
      className={styles["select-board"]}
    >
      {options.map((option) => (
        <option value={option.value}>{option.text}</option>
      ))}
    </select>
  );
}
