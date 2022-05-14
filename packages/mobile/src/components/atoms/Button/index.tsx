import "./style.module.scss";

type Props = {
  text: string;
};

function Button({ text }: Props) {
  return <button type="button">{text}</button>;
}

export default Button;
