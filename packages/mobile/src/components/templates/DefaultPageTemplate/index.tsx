import $ from "./style.module.scss";

type Props = {
  children: JSX.Element;
};

function DefaultPageTemplate({ children }: Props) {
  return <main className={$["default-page-template"]}>{children}</main>;
}

export default DefaultPageTemplate;
