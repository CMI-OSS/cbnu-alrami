import { Route, Routes } from "react-router-dom";

import { AdminJoin, AdminList } from "src/components/AdminManagement";
import PageLayout from "src/components/Layout/Page/Page.view";

export default function AdminManagementPage() {
  return (
    <PageLayout>
      <Routes>
        <Route path="/add" element={<AdminJoin />} />
        <Route path="/list" element={<AdminList />} />
      </Routes>
    </PageLayout>
  );
}
