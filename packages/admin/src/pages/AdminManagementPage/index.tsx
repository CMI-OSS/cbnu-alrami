import { Routes, Route } from "react-router-dom";

import { AdminList, AdminJoin } from "src/components/AdminManagement";

export default function AdminManagementPage() {
  return (
    <Routes>
      <Route path="/add" element={<AdminJoin />} />
      <Route path="/list" element={<AdminList />} />
    </Routes>
  );
}
