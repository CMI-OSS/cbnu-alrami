import { Routes, Route } from "react-router-dom";

import { AdminList, AdminMaker } from "src/components/AdminManagement";

export default function AdminManagementPage() {
  return (
    <Routes>
      <Route path="/add" element={<AdminMaker />} />
      <Route path="/list" element={<AdminList />} />
    </Routes>
  );
}
