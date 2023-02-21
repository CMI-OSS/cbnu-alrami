import { Route, Routes } from "react-router-dom";

import Cafeteria from "src/page/Setting/Cafeteria";
import Main from "src/page/Setting/Main";
import Subscription from "src/page/Setting/Subscription";

import Creator from "./Creator";

function SettingRoute() {
  return (
    <Routes>
      <Route index element={<Main />} />
      <Route path="/subscription" element={<Subscription />} />
      <Route path="/cafeteria" element={<Cafeteria />} />
      <Route path="/creator" element={<Creator />} />
    </Routes>
  );
}

export default SettingRoute;
