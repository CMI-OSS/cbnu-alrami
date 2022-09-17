import styles from "./SelectBoard.module.scss";

interface Option {
  text: string;
  value: number;
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
        <option value={option.value} key={option.value}>
          {option.text}
        </option>
      ))}
    </select>
  );
}
