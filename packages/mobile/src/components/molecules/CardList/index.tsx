import Card from "@components/atoms/Card";
import Notification from "@components/atoms/Card";

import $ from "./style.module.scss";

type Props = {
  notifications: {
    id: number;
    category: string;
    title: string;
    date: string;
    view: number;
    star: number;
  }[];
};

function CardList({ notifications }: Props) {
  console.log(notifications, "공지들");
  return (
    <div className={$["card-list"]}>
      {notifications.map((notification) => (
        <Card key={notification.id} notification={notification} />
      ))}
    </div>
  );
}

export default CardList;
