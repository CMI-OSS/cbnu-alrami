import { Route, Routes } from "react-router-dom";

import PageLayout from "src/components/Layout/Page/Page.view";

import Board from "./Board";

export default function BoardPage() {
  return (
    <PageLayout>
      <Routes>
        <Route path="*" element={<Board />} />
      </Routes>
    </PageLayout>
  );
}
