import { Route, Routes } from "react-router-dom";

import Cafeteria from "src/page/Setting/Cafeteria";
import Main from "src/page/Setting/Main";

export default function SettingRoute() {
  return (
    <Routes>
      <Route index element={<Main />} />
      <Route path="/cafeteria" element={<Cafeteria />} />
    </Routes>
  );
}
