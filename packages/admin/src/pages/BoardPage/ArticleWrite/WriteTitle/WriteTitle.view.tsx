import styles from "./WriteTitle.module.scss";

export interface Props {
  text: string;
  onChangeText: React.ChangeEventHandler<HTMLInputElement>;
}

export default function TitleView({ text, onChangeText }: Props) {
  return (
    <input
      type="text"
      value={text}
      placeholder="제목을 입력하세요."
      onChange={onChangeText}
      className={styles.input}
    ></input>
  );
}
