import { Route, Routes } from "react-router-dom";

import Cafeteria from "src/page/Setting/Cafeteria";
import Main from "src/page/Setting/Main";
import Subscription from "src/page/Setting/Subscription";

function SettingRoute() {
  return (
    <Routes>
      <Route index element={<Main />} />
      <Route path="/cafeteria" element={<Cafeteria />} />
      <Route path="/subscription" element={<Subscription />} />
    </Routes>
  );
}

export default SettingRoute;
