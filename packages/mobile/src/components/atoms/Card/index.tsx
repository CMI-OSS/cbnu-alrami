import $ from "./style.module.scss";

type Props = {
  id: number;
  category: string;
  title: string;
  date: string;
  view: number;
  star: number;
};

function Card({ notification }: { notification: Props }) {
  return (
    <div className={$.card}>
      <div className={$.category}>{notification.category}</div>
      <div className={$.title}>{notification.title}</div>
      <div className={$.detail}>
        {notification.date}&nbsp;/&nbsp;조회수&nbsp;{notification.view}
        &nbsp;/&nbsp;스크랩&nbsp;
        {notification.star}
      </div>
    </div>
  );
}

export default Card;
