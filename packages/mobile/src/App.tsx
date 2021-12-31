import { colors } from "@shared/styles/color";
import { hot } from "react-hot-loader";

function App() {
  return <div>black: {colors.$black}</div>;
}

export default hot(module)(App);
