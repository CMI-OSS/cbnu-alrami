import $ from "./Submit.module.scss";

export interface Props {
  onSubmit: React.MouseEventHandler<HTMLInputElement>;
}

export default function SubmitView({ onSubmit }: Props) {
  return (
    <div style={{ textAlign: "center" }}>
      <input
        className={$.submit}
        type="submit"
        value="출간하기"
        onClick={onSubmit}
      />
    </div>
  );
}
