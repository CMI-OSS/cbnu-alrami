import "./assets/styles/globalStyle.scss";
import { hot } from "react-hot-loader";
import { Notice } from "./components/pages/Notice";

function App() {
  return <Notice />;
}

export default hot(module)(App);
