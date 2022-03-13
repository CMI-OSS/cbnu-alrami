import "@shared/styles/global.scss";
import { hot } from "react-hot-loader";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Footer from "./components/shared/Footer";

function App() {
  return (
    <BrowserRouter>
      <Footer />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default hot(module)(App);
