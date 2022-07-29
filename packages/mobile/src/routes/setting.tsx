import { Route, Routes } from "react-router-dom";

import SettingCafeteria from "src/page/SettingCafeteria";
import SettingMain from "src/page/SettingMain";

export default function SettingRoute() {
  return (
    <Routes>
      <Route index element={<SettingMain />} />
      <Route path="/cafeteria" element={<SettingCafeteria />} />
    </Routes>
  );
}
