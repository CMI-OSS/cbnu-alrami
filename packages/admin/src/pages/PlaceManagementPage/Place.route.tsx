import { Route, Routes } from "react-router-dom";

import { AdminList } from "src/components/AdminManagement";
import PageLayout from "src/components/Layout/Page/Page.view";

import PlaceAdd from "./PlaceAdd";

export default function PlaceManagementPage() {
  return (
    <PageLayout>
      <Routes>
        <Route path="/add" element={<PlaceAdd />} />
        <Route path="/list" element={<AdminList />} />
      </Routes>
    </PageLayout>
  );
}
