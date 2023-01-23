import { Route, Routes } from "react-router-dom";

import PageLayout from "src/components/Layout/Page/Page.view";

import Place from "./Place/Place";
import PlaceAdd from "./PlaceAdd";
import PlaceList from "./PlaceList/PlaceList";
import PlaceUpdate from "./PlaceUpdate";

export default function PlaceManagementPage() {
  return (
    <PageLayout>
      <Routes>
        <Route path="/add" element={<PlaceAdd />} />
        <Route path="/list" element={<PlaceList />} />
        <Route path="/list/:placeId" element={<Place />} />
        <Route path="/edit/:placeId" element={<PlaceUpdate />} />
      </Routes>
    </PageLayout>
  );
}
