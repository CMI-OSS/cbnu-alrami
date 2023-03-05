import { Route, Routes } from "react-router-dom";

import PageLayout from "src/components/Layout/Page/Page.view";

import Board from "./Board";
import BoardEdit from "./BoardEdit/BoardEdit";

export default function BoardPage() {
  return (
    <PageLayout>
      <Routes>
        <Route path="/new" element={<BoardEdit />} />
        <Route path="/edit/:boardId" element={<BoardEdit />} />
        <Route path="*" element={<Board />} />
      </Routes>
    </PageLayout>
  );
}
