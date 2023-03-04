import { Route, Routes } from "react-router-dom";

import PageLayout from "src/components/Layout/Page/Page.view";

import Admin from "./Admin/Admin";
import AdminList from "./AdminList/AdminList";
import Board from "./Board/Board";

export default function PlaceManagementPage() {
  return (
    <PageLayout>
      <Routes>
        <Route path="/list" element={<AdminList />} />
        <Route path="/add" element={<Admin />} />
        <Route path="/:adminId" element={<Admin />} />
        <Route path="/board" element={<Board />} />
      </Routes>
    </PageLayout>
  );
}
