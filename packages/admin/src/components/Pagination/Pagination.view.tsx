import { Pagination } from "antd";
import { PropsType } from "src/types/utils";

import $ from "./Pagination.module.scss";

export default function PaginationView(prop: PropsType<typeof Pagination>) {
  return (
    <div className={$.pagination}>
      <Pagination {...prop} />
    </div>
  );
}
