import { Routes, Route } from "react-router-dom";
import { AdminList, NewAdmin } from "src/components/AdminManagement";

export default function AdminManagementPage() {
  return (
    <Routes>
      <Route path="/add" element={<NewAdmin />} />
      <Route path="/list" element={<AdminList />} />
    </Routes>
  );
}
