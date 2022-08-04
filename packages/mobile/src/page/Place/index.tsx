import { Route, Routes } from "react-router-dom";

import PlaceDetail from "src/page/Place/PlaceDetail";

export default function Place() {
  return (
    <Routes>
      <Route path="/school/*" element={<PlaceDetail menuType={1} />} />
      <Route path="/food/*" element={<PlaceDetail menuType={2} />} />
      <Route path="/convenient/*" element={<PlaceDetail menuType={3} />} />
      <Route path="/snack/*" element={<PlaceDetail menuType={4} />} />
      <Route path="/play/*" element={<PlaceDetail menuType={5} />} />
    </Routes>
  );
}
