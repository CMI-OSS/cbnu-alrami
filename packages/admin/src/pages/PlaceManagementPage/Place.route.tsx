import { Route, Routes } from "react-router-dom";

import PageLayout from "src/components/Layout/Page/Page.view";

import PlaceAdd from "./PlaceAdd";
import PlaceList from "./PlaceList/PlaceList";

export default function PlaceManagementPage() {
  return (
    <PageLayout>
      <Routes>
        <Route path="/add" element={<PlaceAdd />} />
        <Route path="/list" element={<PlaceList />} />
      </Routes>
    </PageLayout>
  );
}
