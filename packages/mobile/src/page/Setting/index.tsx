import { Route, Routes } from "react-router-dom";

import Cafeteria from "src/page/Setting/Cafeteria";
import Main from "src/page/Setting/Main";

import Creator from "./Creator";

function SettingRoute() {
  return (
    <Routes>
      <Route index element={<Main />} />
      <Route path="/cafeteria" element={<Cafeteria />} />
      <Route path="/creator" element={<Creator />} />
    </Routes>
  );
}

export default SettingRoute;
