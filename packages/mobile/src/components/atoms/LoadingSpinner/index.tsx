import $ from "./style.module.scss";

type Props = {
  width: number;
  borderWidth: number;
  color: string;
};

export default function LoadingSpinner({ width, borderWidth, color }: Props) {
  return (
    <div className={$.loading}>
      <div
        style={{
          width: `${width}rem`,
          height: `${width}rem`,
          borderWidth: `${borderWidth}rem`,
          borderTopColor: color,
          borderRightColor: color,
          borderBottomColor: color,
        }}
        className={$.spinner}
      ></div>
    </div>
  );
}
