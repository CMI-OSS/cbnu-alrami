import styles from "./WriteTitle.module.scss";

export interface Props {
  text: string;
  placeholder?: string;
  onChangeText: React.ChangeEventHandler<HTMLInputElement>;
}

export default function TitleView({ text, onChangeText, placeholder }: Props) {
  return (
    <input
      type="text"
      value={text}
      placeholder={placeholder}
      onChange={onChangeText}
      className={styles.input}
    ></input>
  );
}
