import { Route, Routes } from "react-router-dom";

import Board from "src/page/Setting/Board";
import Cafeteria from "src/page/Setting/Cafeteria";
import Main from "src/page/Setting/Main";

import Creator from "./Creator";

function SettingRoute() {
  return (
    <Routes>
      <Route index element={<Main />} />
      <Route path="/board" element={<Board />} />
      <Route path="/cafeteria" element={<Cafeteria />} />
      <Route path="/creator" element={<Creator />} />
    </Routes>
  );
}

export default SettingRoute;
