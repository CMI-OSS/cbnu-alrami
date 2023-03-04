import { Board } from "@shared/swagger-api/generated/models/Board";
import { Breadcrumb } from "antd";

interface Props {
  boards: Board[];
  onClick?: (board: Board) => any;
}

const BreadCrumb = ({ boards, onClick }: Props) => {
  return (
    <Breadcrumb>
      {boards.map((board) => {
        return (
          <Breadcrumb.Item
            key={board.id}
            onClick={() => {
              onClick?.(board);
            }}
          >
            {board.name}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

export default BreadCrumb;
