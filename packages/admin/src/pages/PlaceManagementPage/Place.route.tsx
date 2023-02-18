import { Route, Routes } from "react-router-dom";

import PageLayout from "src/components/Layout/Page/Page.view";

import Place from "./Place/Place";
import PlaceList from "./PlaceList/PlaceList";

export default function PlaceManagementPage() {
  return (
    <PageLayout>
      <Routes>
        <Route path="/list" element={<PlaceList />} />
        <Route path="/add" element={<Place />} />
        <Route path="/:placeId" element={<Place />} />
      </Routes>
    </PageLayout>
  );
}
